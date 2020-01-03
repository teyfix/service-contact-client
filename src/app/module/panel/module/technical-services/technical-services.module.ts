import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalServicesRoutingModule } from './technical-services-routing.module';
import { TechnicalServicesComponent } from './technical-services.component';


@NgModule({
  declarations: [TechnicalServicesComponent],
  imports: [
    CommonModule,
    TechnicalServicesRoutingModule
  ]
})
export class TechnicalServicesModule {
}
