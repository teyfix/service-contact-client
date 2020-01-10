import { IsName, IsPhone } from 'src/validator/class-validator';
import { IsMongoId } from 'class-validator';

export class CreateDealerDto {
  @IsName()
  title: string;

  @IsMongoId()
  city: string;

  @IsPhone()
  phone: string;
}
