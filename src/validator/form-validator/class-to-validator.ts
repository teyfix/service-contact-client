import { AbstractControl } from '@angular/forms';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const classToValidator = <T extends { value: any }>(validatorClass: new() => T, errorName: string, pluck?: string) => {
  const instance = plainToClass(validatorClass, {});

  return (control: AbstractControl) => {
    if (control.valid) {
      instance.value = control.value;

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
    }

    return null;
  };
};
