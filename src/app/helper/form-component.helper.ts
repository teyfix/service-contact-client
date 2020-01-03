import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from './validation-errors';

type Callback = (payload) => Promise<any>;

export const Ready = 'ready';

export class FormComponentHelper<T = any> {
  success: boolean = null;
  response: T;

  formGroup: FormGroup;
  errorResponse: HttpErrorResponse;

  setValue<T>(controlName: string, value: T) {
    return this.formGroup.get(controlName).setValue(value);
  }

  submit(misc: Event | Callback): void;

  submit($event: Event, callback: Callback): void;

  submit($event, callback?) {
    if ('function' === typeof $event) {
      return this.submit(null, $event);
    }

    if ('function' === typeof callback) {
      if ($event instanceof Event) {
        $event.preventDefault();
      }

      this.resolve(callback);
    }
  }

  error(controlName: string) {
    const control = this.formGroup.get(controlName);

    if (control.touched) {
      return Object.keys(control.errors || {})[0] || null;
    }

    return null;
  }

  private resolve(callback: Callback) {
    const {[Ready]: ready, ...payload} = this.formGroup.value;

    if (this.formGroup.valid) {
      this.reset();
      this.setValue(Ready, false);

      callback(payload).then(response => {
        this.success = true;
        this.response = response;
      }, error => {
        if (error instanceof ValidationErrors) {
          error = new HttpErrorResponse({
            error,
            status: 422,
            statusText: 'Unprocessable Entity'
          });
        }

        this.errorResponse = error;
      }).then(() => {
        this.setValue(Ready, true);
      });
    } else {
      if (!ready) {
        // already pending
      }
    }
  }

  private reset() {
    this.success = null;
    this.response = null;
    this.errorResponse = null;
  }
}
