import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { BaseUrlInterceptor } from './interceptor/base-url.interceptor';
import { SharedModule } from 'src/app/module/shared/shared.module';
import { ToastComponent } from './component/toast/toast.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { WriteDealerComponent } from 'src/app/modal/write-dealer/write-dealer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WriteFaultComponent } from 'src/app/modal/write-fault/write-fault.component';
import { WriteFaultRecordComponent } from 'src/app/modal/write-fault-record/write-fault-record.component';
import { WriteFieldTeamComponent } from 'src/app/modal/write-field-team/write-field-team.component';
import { ErrorHandlerInterceptor } from 'src/app/interceptor/error-handler.interceptor';
import { ErrorHandlerService } from 'src/app/service/error-handler/error-handler.service';

const Modals = [
  ConfirmComponent,
  WriteDealerComponent,
  WriteFaultComponent,
  WriteFaultRecordComponent,
  WriteFieldTeamComponent,
];


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  entryComponents: [
    Modals,
  ],
  declarations: [
    AppComponent,
    ToastComponent,
    Modals,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    SharedModule,
  ],
  providers: [
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
