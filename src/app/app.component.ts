import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Verbose } from './helper/verbose';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(authService: AuthService, router: Router) {
    authService.authState.pipe(
      filter(state => state === router.url.startsWith('/auth')),
      switchMap(state => router.navigateByUrl(state ? '/panel' : '/auth'))
    ).subscribe(() => {
      Verbose.info(`Navigated by AppComponent due to authState and route mismatch`);
    });
  }
}
