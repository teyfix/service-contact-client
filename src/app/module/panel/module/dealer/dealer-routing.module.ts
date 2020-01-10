import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerComponent } from 'src/app/module/panel/module/dealer/dealer.component';
import { ModalGuard } from 'src/app/guard/modal/modal.guard';

const routes: Routes = [
  {
    path: '',
    component: DealerComponent,
    canActivateChild: [ModalGuard],
    children: [
      {
        path: 'create',
        data: {modal: 'WriteDealerComponent', previous: '/panel/dealers'},
      },
      {
        path: 'update/:_id',
        data: {modal: 'WriteDealerComponent', previous: '/panel/dealers'},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerRoutingModule {
}
