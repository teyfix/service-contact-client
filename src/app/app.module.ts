import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { BaseUrlInterceptor } from './interceptor/base-url.interceptor';
import { CreateDealerComponent } from 'src/app/modal/create-dealer/create-dealer.component';
import { SharedModule } from 'src/app/module/shared/shared.module';
import { ToastComponent } from './component/toast/toast.component';
import { ConfirmComponent } from './component/confirm/confirm.component';

@NgModule({
  entryComponents: [CreateDealerComponent, ConfirmComponent],
  declarations: [
    AppComponent,
    CreateDealerComponent,
    ToastComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
