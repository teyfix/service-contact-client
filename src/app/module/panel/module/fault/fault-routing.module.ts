import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalGuard } from 'src/app/guard/modal/modal.guard';
import { FaultComponent } from 'src/app/module/panel/module/fault/fault.component';

const routes: Routes = [
  {
    path: '',
    component: FaultComponent,
    canActivateChild: [ModalGuard],
    children: [
      {
        path: 'create',
        data: {modal: 'WriteFaultComponent', previous: '/panel/faults'},
      },
      {
        path: 'update/:_id',
        data: {modal: 'WriteFaultComponent', previous: '/panel/faults'},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaultRoutingModule {
}
