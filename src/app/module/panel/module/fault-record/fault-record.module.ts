import { NgModule } from '@angular/core';

import { FaultRecordRoutingModule } from './fault-record-routing.module';
import { FaultRecordComponent } from './fault-record.component';
import { SharedModule } from 'src/app/module/shared/shared.module';


@NgModule({
  declarations: [FaultRecordComponent],
  imports: [
    SharedModule,
    FaultRecordRoutingModule,
  ],
})
export class FaultRecordModule {
}
