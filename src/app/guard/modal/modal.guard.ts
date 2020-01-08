import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromValidate } from 'src/helper/from-validate';
import { ModalGuardData } from 'src/app/guard/modal/modal-guard.data';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ModalGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router, private readonly ngbModal: NgbModal) {
  }

  canActivate(next: ActivatedRouteSnapshot) {
    return fromValidate(ModalGuardData, next.data).pipe(
      tap(async ({modal, previous}) => {
        await this.ngbModal.open(modal).result.catch(() => void 0);
        await this.router.navigateByUrl(previous || '..');
      }),
      mapTo(true),
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot) {
    return this.canActivate(childRoute);
  }
}
