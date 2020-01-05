import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { OperatorFunction } from 'rxjs';

export function transform<T, U extends object>(type: new () => T): OperatorFunction<U[], T[]>;
export function transform<T, U extends object>(type: new () => T): OperatorFunction<U, T>;

export function transform(type) {
  return map(data => plainToClass(type, data));
}
