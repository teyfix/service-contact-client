import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  title: string;
  message: string;
  approveButton = 'Evet';
  rejectButton = 'Hayır';

  constructor(private readonly ngbActiveModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  approve() {
    this.ngbActiveModal.close(true);
  }

  reject() {
    this.ngbActiveModal.dismiss();
  }
}
