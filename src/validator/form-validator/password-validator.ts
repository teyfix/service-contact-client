import { IsPassword } from 'src/validator/class-validator';
import { classToValidator } from 'src/validator/form-validator/class-to-validator';

class PasswordValidation {
  @IsPassword()
  value: string;
}

export const passwordValidator = classToValidator(PasswordValidation, 'password');
