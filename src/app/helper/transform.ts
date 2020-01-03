import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { OperatorFunction } from 'rxjs';

export function transform<T, U extends object>(type: new() => T, each: true): OperatorFunction<U[], T[]>;
export function transform<T, U extends object>(type: new() => T, each?: false): OperatorFunction<U, T>;

export function transform(type, each?) {
  return map((data: any) => {
    if (each) {
      return data.map(item => plainToClass(type, item));
    }

    return plainToClass(type, data);
  });
}
