import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AuhtGuardData } from './auht-guard-data';
import { fromValidate } from '../../helper/from-validate';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return combineLatest([
      this.authService.authState,
      fromValidate(AuhtGuardData, next.data)
    ]).pipe(
      switchMap(async ([authState, {shouldAuthorized}]) => {
        if (authState === shouldAuthorized) {
          return true;
        }

        await this.router.navigateByUrl(authState ? '/panel' : '/auth');

        return false;
      })
    );
  }
}
