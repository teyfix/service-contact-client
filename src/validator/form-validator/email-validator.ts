import { classToValidator } from 'src/validator/form-validator/class-to-validator';
import { IsEmail } from 'class-validator';

class EmailValidation {
  @IsEmail()
  value: string;
}

export const emailValidator = classToValidator(EmailValidation, 'email');
