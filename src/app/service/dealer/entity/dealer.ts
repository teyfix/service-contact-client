import { IsEntity, IsName, IsPhone } from 'src/validator/class-validator';
import { BaseEntity } from 'src/app/service/base/entity/base.entity';
import { City } from '../../location/entity/city';

export class Dealer extends BaseEntity {
  @IsName()
  title: string;

  @IsPhone()
  phone: string;

  @IsEntity(City)
  city: City;
}
