import { Observable, of } from 'rxjs';
import { transform } from 'src/helper/transform';
import { validate$ } from 'src/helper/validate';

export function fromValidate<T, U extends object>(type: new () => T, data: U): Observable<T>;
export function fromValidate(type, data) {
  return of(data).pipe(
    transform(type),
    validate$(),
  );
}
