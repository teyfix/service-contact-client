import { IsName, IsPhone } from 'src/validator/class-validator';
import { IsMongoId } from 'class-validator';
import { City } from 'src/app/service/location/entity/city';

export class CreateFieldTeamDto {
  @IsName()
  title: string;

  @IsMongoId()
  city: City;

  @IsPhone()
  phone: string;
}
