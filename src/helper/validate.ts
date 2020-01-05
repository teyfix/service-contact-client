import { switchMap } from 'rxjs/operators';
import { validateOrReject } from 'class-validator';
import { ValidationErrors } from 'src/helper/validation-errors';

export const validate$ = () => {
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
};
