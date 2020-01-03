import { switchMap } from 'rxjs/operators';
import { validate } from 'class-validator';
import { ValidationErrors } from './validation-errors';
import { OperatorFunction } from 'rxjs';

export function validate$<T>(): OperatorFunction<T, T>;
export function validate$<T>(): OperatorFunction<T[], T[]>;

export function validate$() {
  return switchMap(async input => {
    const validateFn = async i => {
      const errors = await validate(i);
      if (errors.length) {

        throw new ValidationErrors(errors);
      }
      return i;

    };

    if (input instanceof Array) {
      return Promise.all(input.map(validateFn));
    }

    return validateFn(input);
  });
}
