import { IsEmail } from 'class-validator';

export class ResetPasswordPayload {
  @IsEmail()
  email: string;
}
