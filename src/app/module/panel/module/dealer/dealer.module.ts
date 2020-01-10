import { NgModule } from '@angular/core';

import { DealerRoutingModule } from 'src/app/module/panel/module/dealer/dealer-routing.module';
import { DealerComponent } from 'src/app/module/panel/module/dealer/dealer.component';
import { SharedModule } from 'src/app/module/shared/shared.module';


@NgModule({
  declarations: [DealerComponent],
  imports: [
    SharedModule,
    DealerRoutingModule,
  ],
})
export class DealerModule {
}
