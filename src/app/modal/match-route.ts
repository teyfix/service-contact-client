import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/app/modal/modal-routes';
import { Route } from '@angular/router';

export const matchRoute = (): OperatorFunction<string, Route> => {
  return (source: Observable<string>) => {
    return source.pipe(
      map(url => {
        let stack = routes;
        const parts = url.toLowerCase().split('/');

        for (let i = 0; i < parts.length; i++) {
          if (stack instanceof Array) {
            for (const route of stack) {
              if (route.path.startsWith(':') || parts[i] === route.path.toLowerCase()) {
                if (i + 1 === parts.length) {
                  return route;
                }

                stack = route.children;
              }
            }
          } else {
            return null;
          }
        }

        return null;
      }),
    );
  };
};
