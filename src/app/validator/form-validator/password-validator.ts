import { IsPassword } from '../class-validator';
import { classToValidator } from './class-to-validator';

class PasswordValidation {
  @IsPassword()
  value: string;
}

export const passwordValidator = classToValidator(PasswordValidation, 'password');
