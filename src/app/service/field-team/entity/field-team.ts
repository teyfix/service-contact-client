import { City } from 'src/app/service/location/entity/city';
import { Fault } from 'src/app/service/fault/entity/fault';
import { TitleEntity } from 'src/app/service/base/entity/title.entity';
import { IsEntity, IsPhone } from 'src/validator/class-validator';

export class FieldTeam extends TitleEntity {
  @IsEntity(City)
  city: City;

  @IsPhone()
  phone: string;

  @IsEntity(Fault, {each: true})
  faults: Fault[];
}
