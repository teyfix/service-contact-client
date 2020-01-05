import { IsEmail } from 'class-validator';
import { IsPassword } from '../../../../validator/class-validator/is-password';
import { IsName } from '../../../../validator/class-validator/is-name';
import { sanitizeNameString } from '../../../../helper/sanitize-name-string';

export class RegisterPayload {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsName()
  firstName: string;

  @IsName(false)
  lastName: string;

  toJSON() {
    const object = {...this};

    object.firstName = sanitizeNameString(this.firstName);
    object.lastName = sanitizeNameString(this.lastName);

    return object;
  }
}
