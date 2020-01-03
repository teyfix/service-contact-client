import { IsName } from '../../../validator/class-validator/is-name';
import { IsMongoId } from 'class-validator';
import { IsPhone } from '../../../validator/class-validator/is-phone';

export class CreateDealer {
  @IsName()
  title: string;

  @IsMongoId()
  city: string;

  @IsPhone()
  phone: string;
}
