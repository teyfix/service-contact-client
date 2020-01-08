import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealersComponent } from './dealers.component';
import { ModalGuard } from 'src/app/guard/modal/modal.guard';

const routes: Routes = [
  {
    path: '',
    component: DealersComponent,
    canActivateChild: [ModalGuard],
    children: [
      {path: 'create', data: {modal: 'CreateDealerComponent'}},
      {path: 'update/:id', data: {modal: 'CreateDealerComponent'}},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealersRoutingModule {
}
