import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/service/location/city.service';
import { FormBuilder, Validators } from '@angular/forms';
import { mongoIdValidator, nameWithSpacesValidator, phoneValidator } from 'src/validator/form-validator';
import { FormComponentHelper } from 'src/helper/form-component.helper';
import { FieldTeamService } from 'src/app/service/field-team/field-team.service';
import { FaultService } from 'src/app/service/fault/fault.service';

@Component({
  selector: 'app-write-field-team',
  templateUrl: './write-field-team.component.html',
  styleUrls: ['./write-field-team.component.scss'],
})
export class WriteFieldTeamComponent extends FormComponentHelper implements OnInit {
  readonly citySearch = this.cityService.typeahead();
  readonly faultSearch = this.faultService.typeahead();

  constructor(
    private readonly cityService: CityService,
    private readonly formBuilder: FormBuilder,
    private readonly faultService: FaultService,
    private readonly fieldTeamService: FieldTeamService,
  ) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ready: [true, Validators.requiredTrue],

      title: [null, [Validators.required, nameWithSpacesValidator]],
      phone: [null, [Validators.required, phoneValidator]],
      city: [null, [Validators.required, mongoIdValidator]],
      faults: [null, [Validators.required, mongoIdValidator]],
    });

    if (this.params._id) {
      const subscription = this.fieldTeamService.findById(this.params._id).subscribe(fieldTeam => {
        this.patchFormData(fieldTeam);
        this.unsubscribe(subscription);
      });

      this.addSubscription(subscription);
    }
  }

  submit($event: Event): void {
    super.submit($event, payload => {
      if (this.params._id) {
        return this.fieldTeamService.update(this.params._id, payload);
      } else {
        return this.fieldTeamService.create(payload);
      }
    });
  }
}
