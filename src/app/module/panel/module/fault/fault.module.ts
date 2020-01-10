import { NgModule } from '@angular/core';

import { FaultRoutingModule } from './fault-routing.module';
import { FaultComponent } from './fault.component';
import { SharedModule } from 'src/app/module/shared/shared.module';


@NgModule({
  declarations: [FaultComponent],
  imports: [
    SharedModule,
    FaultRoutingModule,
  ],
})
export class FaultModule {
}
