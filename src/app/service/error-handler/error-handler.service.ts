import { ErrorHandler, Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { ErrorHandlerInterceptor } from 'src/app/interceptor/error-handler.interceptor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  private readonly errorSubject = new Subject<Error>();
  readonly error = merge(this.errorSubject, ErrorHandlerInterceptor.error);

  handleError(error: any): void {
    this.errorSubject.next(error);

    if (!environment.production) {
      throw error;
    }
  }
}
