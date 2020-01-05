import { IsEmail, IsEnum } from 'class-validator';
import { IsName } from 'src/validator/class-validator';

const firstLetters = Symbol();

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

  get firstLetters(): string {
    if (!this[firstLetters]) {
      this[firstLetters] = this.firstName.split(/\s+/).slice(0, 2).concat(this.lastName).map(_ => _.substring(0, 1)).join('');
    }

    return this[firstLetters];
  }
}
