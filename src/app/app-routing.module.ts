import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    data: {shouldAuthorized: false},
    canActivate: [AuthGuard],
    loadChildren: () => {
      return import('./module/auth/auth.module').then(m => m.AuthModule);
    }
  },
  {
    path: 'panel',
    data: {shouldAuthorized: true},
    canActivate: [AuthGuard],
    loadChildren: () => {
      return import('./module/panel/panel.module').then(m => m.PanelModule);
    }
  },
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
