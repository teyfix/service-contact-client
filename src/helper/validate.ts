import { switchMap } from 'rxjs/operators';
import { validateOrReject } from 'class-validator';
import { OperatorFunction } from 'rxjs';
import { ValidationErrors } from 'src/helper/validation-errors';

export function validate$<T, U extends object>(): OperatorFunction<U[], T[]>;
export function validate$<T, U extends object>(): OperatorFunction<U, T>;

export function validate$() {
  return switchMap(async data => {
    const validateFn = async input => {
      try {
        await validateOrReject(input);
      } catch (e) {
        throw new ValidationErrors(e);
      }

      return input;
    };

    if (data instanceof Array) {
      return Promise.all(data.map(validateFn));
    }

    return validateFn(data);
  });
}
