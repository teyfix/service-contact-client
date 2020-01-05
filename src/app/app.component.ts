import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { NavigationEnd, Route, Router } from '@angular/router';
import { filter, first, pluck, switchMap, tap } from 'rxjs/operators';
import { Verbose } from '../helper/verbose';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { matchRoute } from 'src/app/modal/match-route';
import { merge, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private activeRoute: Route;
  private activeModal: NgbModalRef;

  constructor(
    private readonly router: Router,
    private readonly ngbModal: NgbModal,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.authState.pipe(
      filter(state => state === this.router.url.startsWith('/auth')),
      switchMap(state => this.router.navigateByUrl(state ? '/panel' : '/auth')),
    ).subscribe(() => {
      Verbose.info(`Navigated by AppComponent due to authState and route mismatch`);
    });

    this.router.events.pipe(
      filter<NavigationEnd>(e => e instanceof NavigationEnd),
      pluck('urlAfterRedirects'),
      matchRoute(),
      filter(route => route !== this.activeRoute),
      tap(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      }),
      switchMap(async route => {
        if (route.component) {
          this.activeModal = this.ngbModal.open(route.component);

          const {result, componentInstance: {done}} = this.activeModal;

          await merge(done || of(), result).pipe(first()).toPromise();

          if (route.data && route.data.previous) {
            await this.router.navigateByUrl(route.data.previous);
          }
        }
      }),
    ).subscribe(() => void 0);
  }
}
