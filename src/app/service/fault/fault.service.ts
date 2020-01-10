import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/service/base/base.service';
import { Fault } from 'src/app/service/fault/entity/fault';
import { CreateFaultDto } from 'src/app/service/fault/dto/create-fault.dto';
import { UpdateFaultDto } from 'src/app/service/fault/dto/update-fault.dto';

@Injectable({
  providedIn: 'root',
})
export class FaultService extends BaseService<Fault> {
  entity = Fault;
  prefix = 'fault';
  CreateDto = CreateFaultDto;
  UpdateDto = UpdateFaultDto;

  typeahead() {
    return super.typeahead('title');
  }
}
