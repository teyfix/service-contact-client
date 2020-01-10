import { AbstractControl } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export const classToValidator = <T extends { value: any }>(validatorClass: new() => T, errorName: string, pluck?: string) => {
  const instance = plainToClass(validatorClass, {});

  return (control: AbstractControl) => {
    if (control.valid) {
      if (control.value == null) {
        return null;
      }

      const validate = value => {
        instance.value = value;

        if (
          pluck &&
          instance.value &&
          'string' === typeof pluck &&
          'object' === typeof instance.value &&
          pluck in instance.value
        ) {
          instance.value = instance.value[pluck];
        }

        if (validateSync(instance).length) {
          return {[errorName]: true};
        }

        return null;
      };

      if (control.value instanceof Array) {
        for (const item of control.value) {
          const validation = validate(item);

          if (validation) {
            return validation;
          }
        }
      } else {
        return validate(control.value);
      }
    }

    return null;
  };
};
