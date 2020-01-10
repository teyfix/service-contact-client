import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/component/confirm/confirm.component';
import { BooleanInput } from 'src/decorator/boolean-input';

@Directive({
  selector: '[confirm]',
})
export class ConfirmDirective {
  @Input()
  title: string;

  @Input()
  message: string;

  @Input()
  approveButton: string;

  @Input()
  rejectButton: string;

  @BooleanInput()
  preventDefault = true;

  @Output()
  confirm = new EventEmitter<void>();

  @Output()
  reject = new EventEmitter<void>();

  constructor(private readonly ngbModal: NgbModal) {
  }

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    const modal = this.ngbModal.open(ConfirmComponent);
    const component = modal.componentInstance;

    component.title = this.title || component.title;
    component.message = this.message || component.title;
    component.approveButton = this.approveButton || component.approveButton;
    component.rejectButton = this.rejectButton || component.rejectButton;

    modal.result.then(() => this.confirm.next(null), () => this.reject.next(null));

    if (this.preventDefault) {
      $event.preventDefault();
    }
  }
}
