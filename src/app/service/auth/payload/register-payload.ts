import { IsEmail } from 'class-validator';
import { IsName, IsPassword } from 'src/validator/class-validator';
import { sanitizeNameString } from 'src/helper/sanitize-name-string';
import { ToJson } from 'src/app/interface/to-json';

export class RegisterPayload implements ToJson {
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
