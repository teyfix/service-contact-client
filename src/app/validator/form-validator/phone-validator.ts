import { IsPassword } from '../class-validator';
import { classToValidator } from './class-to-validator';

class PhoneValidation {
  @IsPassword()
  value: string;
}

export const phoneValidator = classToValidator(PhoneValidation, 'phone');
