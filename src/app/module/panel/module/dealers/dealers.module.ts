import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealersRoutingModule } from './dealers-routing.module';
import { DealersComponent } from './dealers.component';
import { CreateDealerComponent } from './component/create-dealer/create-dealer.component';


@NgModule({
  declarations: [DealersComponent, CreateDealerComponent],
  imports: [
    CommonModule,
    DealersRoutingModule
  ]
})
export class DealersModule {
}
