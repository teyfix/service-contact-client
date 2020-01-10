import { CreateFaultRecordDto } from 'src/app/service/fault-record/dto/create-fault-record.dto';
import { IsOptional } from 'class-validator';
import { Fault } from 'src/app/service/fault/entity/fault';
import { FieldTeam } from 'src/app/service/field-team/entity/field-team';

export class UpdateFaultRecordDto extends CreateFaultRecordDto {
  @IsOptional()
  fault: Fault;

  @IsOptional()
  fieldTeam: FieldTeam;
}
