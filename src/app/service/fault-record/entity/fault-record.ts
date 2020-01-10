import { BaseEntity } from 'src/app/service/base/entity/base.entity';
import { Fault } from 'src/app/service/fault/entity/fault';
import { FieldTeam } from 'src/app/service/field-team/entity/field-team';
import { City } from 'src/app/service/location/entity/city';
import { IsEntity } from 'src/validator/class-validator/is-entity';

export class FaultRecord extends BaseEntity {
  @IsEntity(City)
  city: City;

  @IsEntity(Fault)
  fault: Fault;

  @IsEntity(FieldTeam)
  fieldTeam: FieldTeam;
}
