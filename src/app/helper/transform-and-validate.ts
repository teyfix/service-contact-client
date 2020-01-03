import { Observable } from 'rxjs';
import { validate$ } from './validate';
import { transform } from './transform';

export function transformAndValidate<T>(type: new() => T, each: true): <U extends object>(source: Observable<U[]>) => Observable<T[]>;
export function transformAndValidate<T>(type: new() => T, each?: false): <U extends object>(source: Observable<U>) => Observable<T>;

export function transformAndValidate<T>(type, each?) {
  return source => {
    return source.pipe(
      transform(type, each),
      validate$()
    );
  };
}
