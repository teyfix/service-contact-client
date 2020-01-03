import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalServicesComponent } from './technical-services.component';


const routes: Routes = [
  {path: '', component: TechnicalServicesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalServicesRoutingModule {
}
