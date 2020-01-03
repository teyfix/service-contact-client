import { IsName } from '../class-validator';
import { classToValidator } from './class-to-validator';

class NameValidation {
  @IsName()
  value: string;
}

class NameWithSpacesValidation {
  @IsName(true)
  value: string;
}

export const nameValidator = classToValidator(NameValidation, 'name');
export const nameWithSpacesValidator = classToValidator(NameWithSpacesValidation, 'name');
