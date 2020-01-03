import { AbstractControl } from '@angular/forms';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const classToValidator = <T extends { value: any }>(validatorClass: new() => T, errorName: string) => {
  const instance = plainToClass(validatorClass, {});

  return (control: AbstractControl) => {
    if (control.valid) {
      instance.value = control.value;

      if (validateSync(instance).length) {
        return {[errorName]: true};
      }
    }

    return null;
  };
};
