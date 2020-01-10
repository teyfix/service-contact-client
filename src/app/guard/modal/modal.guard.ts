import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, NavigationEnd, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { fromValidate } from 'src/helper/from-validate';
import { ModalGuardData } from 'src/app/guard/modal/modal-guard.data';
import { filter, mapTo, skip, tap } from 'rxjs/operators';
import { merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalGuard implements CanActivate, CanActivateChild {
  private activeModal: NgbModalRef;
  private readonly navigated = this.router.events.pipe(
    filter<NavigationEnd>(e => e instanceof NavigationEnd),
  );

  constructor(private readonly router: Router, private readonly ngbModal: NgbModal) {
  }

  canActivate(next: ActivatedRouteSnapshot) {
    return fromValidate(ModalGuardData, next.data).pipe(
      tap(async ({modal, previous}) => {
        if (this.activeModal) {
          this.activeModal.close();
        }

        this.activeModal = this.ngbModal.open(modal);
        this.activeModal.componentInstance.params = next.params;

        await this.onClose(this.activeModal);
        await this.router.navigateByUrl(previous || '..');
      }),
      mapTo(true),
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot) {
    return this.canActivate(childRoute);
  }

  private onClose(ngbModalRef: NgbModalRef) {
    let subscription = merge(
      this.navigated.pipe(skip(1)),
      ngbModalRef.componentInstance.done || of(),
    ).subscribe(() => {
      ngbModalRef.close();
    });

    return ngbModalRef.result.catch(() => void 0).then(() => {
      if (subscription) {
        subscription.unsubscribe();
        subscription = null;
      }
    });
  }
}
