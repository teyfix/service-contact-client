import { IsName } from 'src/validator/class-validator';
import { classToValidator } from 'src/validator/form-validator/class-to-validator';

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
