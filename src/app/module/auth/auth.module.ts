import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ResetPasswordComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
