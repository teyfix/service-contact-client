import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private static readonly errorSubject = new Subject<HttpErrorResponse>();
  static readonly error = ErrorHandlerInterceptor.errorSubject.asObservable();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone()).pipe(
      catchError(error => {
        ErrorHandlerInterceptor.errorSubject.next(error);

        return throwError(error);
      }),
    );
  }
}
