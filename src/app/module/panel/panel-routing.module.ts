import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';


const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'dealers',
        loadChildren: () => {
          return import('./module/dealers/dealers.module').then(m => m.DealersModule);
        }
      },
      {
        path: 'technical-services',
        loadChildren: () => {
          return import('./module/technical-services/technical-services.module').then(m => m.TechnicalServicesModule);
        }
      },
      {path: '**', redirectTo: 'dealers'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {
}
