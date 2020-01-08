import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Verbose } from '../helper/verbose';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly router: Router, private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authState.pipe(
      filter(state => state === this.router.url.startsWith('/auth')),
      switchMap(state => this.router.navigateByUrl(state ? '/panel' : '/auth')),
    ).subscribe(() => {
      Verbose.info(`Navigated by AppComponent due to authState and route mismatch`);
    });
  }
}
