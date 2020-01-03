import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { storage } from '../helper/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  appendToken<T>(req: HttpRequest<T>) {
    if (storage.token) {
      return req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + storage.token
        })
      });
    }

    return req.clone();
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    req = this.appendToken(req);

    return next.handle(req).pipe(
      tap(response => {
        if (response instanceof HttpResponse) {
          try {
            if ('string' === typeof response.body.token) {
              storage.token = response.body.token;
            }
          } catch (e) {
          }
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          delete storage.token;
        }

        return throwError(error);
      })
    );
  }
}
