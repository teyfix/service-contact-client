import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealersComponent } from './dealers.component';


const routes: Routes = [
  {path: '', component: DealersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealersRoutingModule {
}
