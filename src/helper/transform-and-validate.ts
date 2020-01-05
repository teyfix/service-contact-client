import { validate$ } from 'src/helper/validate';
import { transform } from 'src/helper/transform';
import { Observable, OperatorFunction } from 'rxjs';

export function transformAndValidate<T, U extends object>(type: new () => T): OperatorFunction<U[], T[]>;
export function transformAndValidate<T, U extends object>(type: new () => T): OperatorFunction<U, T>;

export function transformAndValidate(type) {
  return source => source.pipe(transform(type), validate$());
}
