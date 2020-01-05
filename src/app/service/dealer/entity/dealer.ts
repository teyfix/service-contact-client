import { IsName } from 'src/validator/class-validator';
import { IsPhone } from 'src/validator/class-validator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntity } from '../../base/base.entity';
import { City } from '../../location/entity/city';

export class Dealer extends BaseEntity {
  @IsName()
  title: string;

  @IsPhone()
  phone: string;

  @ValidateNested()
  @Type(() => City)
  city: City;
}
