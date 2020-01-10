import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Type } from '@angular/core';
import { WriteDealerComponent } from 'src/app/modal/write-dealer/write-dealer.component';
import { WriteFaultComponent } from 'src/app/modal/write-fault/write-fault.component';
import { WriteFaultRecordComponent } from 'src/app/modal/write-fault-record/write-fault-record.component';
import { WriteFieldTeamComponent } from 'src/app/modal/write-field-team/write-field-team.component';

export class ModalGuardData {
  static readonly Modals = {
    WriteDealerComponent,
    WriteFaultComponent,
    WriteFaultRecordComponent,
    WriteFieldTeamComponent,
  };

  @Transform(modalName => ModalGuardData.Modals[modalName])
  @IsNotEmpty()
  modal: Type<any>;

  @IsString()
  @IsOptional()
  previous: string;
}
