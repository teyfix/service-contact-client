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
        loadChildren: () => import('./module/dealer/dealer.module').then(m => m.DealerModule),
      },
      {
        path: 'faults',
        loadChildren: () => import('./module/fault/fault.module').then(m => m.FaultModule),
      },
      {
        path: 'fault-records',
        loadChildren: () => import('./module/fault-record/fault-record.module').then(m => m.FaultRecordModule),
      },
      {
        path: 'field-teams',
        loadChildren: () => import('./module/field-team/field-team.module').then(m => m.FieldTeamModule),
      },
      {path: '**', redirectTo: 'dealers'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {
}
