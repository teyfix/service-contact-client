import { classToValidator } from './class-to-validator';
import { IsEmail } from 'class-validator';

class EmailValidation {
  @IsEmail()
  value: string;
}

export const emailValidator = classToValidator(EmailValidation, 'email');
