import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/service/base/base.service';
import { FieldTeam } from 'src/app/service/field-team/entity/field-team';
import { CreateFieldTeamDto } from 'src/app/service/field-team/dto/create-field-team.dto';
import { UpdateFieldTeamDto } from 'src/app/service/field-team/dto/update-field-team.dto';

@Injectable({
  providedIn: 'root',
})
export class FieldTeamService extends BaseService<FieldTeam> {
  entity = FieldTeam;
  prefix = 'field-team';
  CreateDto = CreateFieldTeamDto;
  UpdateDto = UpdateFieldTeamDto;
}
