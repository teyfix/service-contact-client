import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalGuard } from 'src/app/guard/modal/modal.guard';
import { FaultRecordComponent } from 'src/app/module/panel/module/fault-record/fault-record.component';

const routes: Routes = [
  {
    path: '',
    component: FaultRecordComponent,
    canActivateChild: [ModalGuard],
    children: [
      {
        path: 'create',
        data: {modal: 'WriteFaultRecordComponent', previous: '/panel/fault-records'},
      },
      {
        path: 'update/:id',
        data: {modal: 'WriteFaultRecordComponent', previous: '/panel/fault-records'},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaultRecordRoutingModule {
}
