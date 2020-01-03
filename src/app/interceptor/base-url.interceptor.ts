import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { parse, resolve } from 'url';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const url = parse(req.url);

    if (url.hostname) {
      return next.handle(req);
    }

    return next.handle(
      req.clone({
        url: resolve(environment.baseURL, req.url)
      })
    );
  }
}
