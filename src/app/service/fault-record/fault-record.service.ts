import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/service/base/base.service';
import { FaultRecord } from 'src/app/service/fault-record/entity/fault-record';
import { CreateFaultRecordDto } from 'src/app/service/fault-record/dto/create-fault-record.dto';
import { UpdateFaultRecordDto } from 'src/app/service/fault-record/dto/update-fault-record.dto';

@Injectable({
  providedIn: 'root',
})
export class FaultRecordService extends BaseService<FaultRecord> {
  entity = FaultRecord;
  prefix = 'fault-record';
  CreateDto = CreateFaultRecordDto;
  UpdateDto = UpdateFaultRecordDto;
}
