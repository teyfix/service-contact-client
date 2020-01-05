import { IsPhone } from 'src/validator/class-validator';
import { classToValidator } from 'src/validator/form-validator/class-to-validator';

class PhoneValidation {
  @IsPhone()
  value: string;
}

export const phoneValidator = classToValidator(PhoneValidation, 'phone');
