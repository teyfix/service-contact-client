import { NgModule } from '@angular/core';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PanelComponent, NavbarComponent],
  imports: [
    SharedModule,
    PanelRoutingModule
  ]
})
export class PanelModule {
}
