import { IsEmail } from 'class-validator';
import { IsPassword } from '../../../../validator/class-validator/is-password';

export class LoginPayload {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;
}
