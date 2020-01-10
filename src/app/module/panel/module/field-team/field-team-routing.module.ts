import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalGuard } from 'src/app/guard/modal/modal.guard';
import { FieldTeamComponent } from 'src/app/module/panel/module/field-team/field-team.component';

const routes: Routes = [
  {
    path: '',
    component: FieldTeamComponent,
    canActivateChild: [ModalGuard],
    children: [
      {
        path: 'create',
        data: {modal: 'WriteFieldTeamComponent', previous: '/panel/field-teams'},
      },
      {
        path: 'update/:_id',
        data: {modal: 'WriteFieldTeamComponent', previous: '/panel/field-teams'},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldTeamRoutingModule {
}
