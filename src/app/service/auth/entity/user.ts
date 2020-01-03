import { IsEmail, IsEnum } from 'class-validator';
import { IsName } from '../../../validator/class-validator/is-name';

export enum Role {
  User = 1,
  Moderator = 10,
  Admin = 20,
}

export class User {
  @IsEmail()
  email: string;

  @IsName()
  firstName: string;

  @IsName(false)
  lastName: string;

  @IsEnum(Role)
  role: Role;
}
