import { Component, OnInit } from '@angular/core';
import { FormComponentHelper } from 'src/helper/form-component.helper';
import { Fault } from 'src/app/service/fault/entity/fault';
import { FormBuilder, Validators } from '@angular/forms';
import { nameWithSpacesValidator } from 'src/validator/form-validator';
import { FaultService } from 'src/app/service/fault/fault.service';

@Component({
  selector: 'app-write-fault',
  templateUrl: './write-fault.component.html',
  styleUrls: ['./write-fault.component.scss'],
})
export class WriteFaultComponent extends FormComponentHelper<Fault> implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    protected readonly faultService: FaultService,
  ) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ready: [true, Validators.requiredTrue],

      title: [null, [Validators.required, nameWithSpacesValidator]],
    });
  }

  submit($event: Event) {
    super.submit($event, payload => {
      if (this.params._id) {
        return this.faultService.update(this.params._id, payload);
      } else {
        return this.faultService.create(payload);
      }
    });
  }
}
