import { IsMongoId } from 'class-validator';
import { Fault } from 'src/app/service/fault/entity/fault';
import { FieldTeam } from 'src/app/service/field-team/entity/field-team';

export class CreateFaultRecordDto {
  @IsMongoId()
  fault: Fault;

  @IsMongoId()
  fieldTeam: FieldTeam;
}
