import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Verbose } from '../helper/verbose';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/service/error-handler/error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pending = true;
  connectionProblems = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly translateService: TranslateService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      this.pending = false;
    });

    this.authService.authState.pipe(
      filter(state => state === this.router.url.startsWith('/auth')),
      switchMap(state => this.router.navigateByUrl(state ? '/panel' : '/auth')),
    ).subscribe(() => {
      Verbose.info(`Navigated by AppComponent due to authState and route mismatch`);
    });

    this.errorHandlerService.error.subscribe(error => {
      if (error instanceof HttpErrorResponse && error.status === 0) {
        this.pending = false;
        this.connectionProblems = true;
      }
    });

    this.translateService.setDefaultLang('tr');
  }
}
