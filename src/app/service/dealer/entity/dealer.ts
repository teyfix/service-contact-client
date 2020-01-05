import { IsName } from '../../../../validator/class-validator/is-name';
import { IsPhone } from '../../../../validator/class-validator/is-phone';
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
