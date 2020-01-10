import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from 'src/helper/base-component';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ValidationErrors } from 'src/helper/validation-errors';
import { Verbose } from 'src/helper/verbose';
import { BaseEntity } from 'src/app/service/base/entity/base.entity';

type Callback<T> = (payload) => Observable<T>;
type Params = { [key: string]: boolean | number | string; } & Partial<BaseEntity>;

export const Ready = 'ready';

export class FormComponentHelper<T = any> extends BaseComponent {
  done = new Subject<void>();
  params: Params = {};

  formGroup: FormGroup;

  response: T;
  errorResponse: HttpErrorResponse;

  setValue<U>(controlName: string, value: U) {
    return this.formGroup.get(controlName).setValue(value);
  }

  patchFormData<U extends Partial<T>>(value: U) {
    const formData = this.formGroup.value;

    Object.keys(this.formGroup.controls).forEach(key => {
      if (key in value) {
        formData[key] = value[key];
      }
    });

    return this.formGroup.setValue(formData);
  }

  submit(misc: Event | Callback<T>): void;

  submit($event: Event, callback: Callback<T>): void;

  submit($event, callback?) {
    if ('function' === typeof $event) {
      return this.submit(null, $event);
    }

    if ('function' === typeof callback) {
      if ($event instanceof Event) {
        $event.preventDefault();
      }


      if (this.formGroup.valid) {
        this.reset();
        this.setValue(Ready, false);

        this.resolve(callback);
      }
    }
  }

  error(controlName: string) {
    const control = this.formGroup.get(controlName);

    if (control.touched) {
      return Object.keys(control.errors || {})[0] || null;
    }

    return null;
  }

  private sanitize() {
    const sanitizer = input => {
      const output = input instanceof Array ? [] : {};

      Object.entries(input).forEach(([key, value]) => {
        if (value == null) {
          output[key] = null;
        } else {
          if ('object' === typeof value) {
            if (value instanceof BaseEntity) {
              output[key] = value._id;
            } else {
              output[key] = sanitizer(value);
            }
          } else {
            output[key] = value;
          }
        }
      });

      return output;
    };

    const {[Ready]: ready, ...payload} = this.formGroup.value;

    return sanitizer(payload);
  }

  private resolve(callback: Callback<T>) {
    const payload = this.sanitize();

    this.addSubscription(
      callback(payload).pipe(
        take(1),
        catchError(error => {
          Verbose.error(error);

          if (error instanceof ValidationErrors) {
            error = new HttpErrorResponse({
              error,
              status: 422,
              statusText: 'Unprocessable Entity',
            });
          }

          return throwError(error);
        }),
      ).subscribe(response => {
        this.done.next(null);
        this.response = response;
      }, error => {
        this.errorResponse = error;
      }, () => {
        this.setValue(Ready, true);
      }),
    );
  }

  private reset() {
    this.response = null;
    this.errorResponse = null;
  }
}
