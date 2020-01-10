import { NgModule } from '@angular/core';

import { FieldTeamRoutingModule } from './field-team-routing.module';
import { FieldTeamComponent } from './field-team.component';
import { SharedModule } from 'src/app/module/shared/shared.module';


@NgModule({
  declarations: [FieldTeamComponent],
  imports: [
    SharedModule,
    FieldTeamRoutingModule,
  ],
})
export class FieldTeamModule {
}
