import { Component, OnInit } from '@angular/core';
import { FormComponentHelper } from 'src/app/helper/form-component.helper';
import { FormBuilder, Validators } from '@angular/forms';
import { mongoIdValidator, nameWithSpacesValidator, phoneValidator } from 'src/app/validator/form-validator';
import { DealerService } from 'src/app/service/dealer/dealer.service';

@Component({
  selector: 'app-create-dealer',
  templateUrl: './create-dealer.component.html',
  styleUrls: ['./create-dealer.component.scss']
})
export class CreateDealerComponent extends FormComponentHelper implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dealerService: DealerService
  ) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ready: [true, Validators.requiredTrue],

      title: ['', [Validators.required, nameWithSpacesValidator]],
      phone: ['', [Validators.required, phoneValidator]],
      city: ['', [Validators.required, mongoIdValidator]]
    });
  }

  submit($event: Event): void {
    super.submit($event, payload => this.dealerService.createDealer(payload).toPromise());
  }
}
