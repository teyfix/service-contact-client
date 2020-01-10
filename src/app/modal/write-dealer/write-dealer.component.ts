import { Component, OnInit } from '@angular/core';
import { FormComponentHelper } from 'src/helper/form-component.helper';
import { FormBuilder, Validators } from '@angular/forms';
import { mongoIdValidator, nameWithSpacesValidator, phoneValidator } from 'src/validator/form-validator';
import { DealerService } from 'src/app/service/dealer/dealer.service';
import { CityService } from 'src/app/service/location/city.service';
import { Dealer } from 'src/app/service/dealer/entity/dealer';

@Component({
  selector: 'app-create-dealer',
  templateUrl: './write-dealer.component.html',
  styleUrls: ['./write-dealer.component.scss'],
})
export class WriteDealerComponent extends FormComponentHelper<Dealer> implements OnInit {
  readonly search = this.cityService.typeahead();

  constructor(
    private readonly cityService: CityService,
    private readonly formBuilder: FormBuilder,
    private readonly dealerService: DealerService,
  ) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ready: [true, Validators.requiredTrue],

      title: [null, [Validators.required, nameWithSpacesValidator]],
      phone: [null, [Validators.required, phoneValidator]],
      city: [null, [Validators.required, mongoIdValidator]],
    });

    this.formGroup.valueChanges.subscribe(console.log);

    if (this.params._id) {
      const subscription = this.dealerService.findById(this.params._id).subscribe(dealer => {
        this.patchFormData(dealer);
        this.unsubscribe(subscription);
      });

      this.addSubscription(subscription);
    }
  }

  submit($event: Event): void {
    super.submit($event, payload => {
      if (this.params._id) {
        return this.dealerService.update(this.params._id, payload);
      } else {
        return this.dealerService.create(payload);
      }
    });
  }
}
