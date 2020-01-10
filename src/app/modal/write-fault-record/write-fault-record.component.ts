import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/service/location/city.service';
import { FormBuilder, Validators } from '@angular/forms';
import { mongoIdValidator } from 'src/validator/form-validator';
import { FormComponentHelper } from 'src/helper/form-component.helper';
import { FaultRecordService } from 'src/app/service/fault-record/fault-record.service';
import { FieldTeamService } from 'src/app/service/field-team/field-team.service';
import { FaultService } from 'src/app/service/fault/fault.service';
import { FieldTeam } from 'src/app/service/field-team/entity/field-team';
import { filter } from 'rxjs/operators';
import { merge } from 'rxjs';
import { BaseEntity } from 'src/app/service/base/entity/base.entity';

@Component({
  selector: 'app-write-fault-record',
  templateUrl: './write-fault-record.component.html',
  styleUrls: ['./write-fault-record.component.scss'],
})
export class WriteFaultRecordComponent extends FormComponentHelper implements OnInit {
  citySearch = this.cityService.typeahead();
  faultSearch = this.faultService.typeahead();
  fieldTeamSearch = this.fieldTeamService.typeahead((fieldTeam, input) => {
    const {city, fault} = this.formGroup.controls;

    return (
      (city.valid && city.value._id === fieldTeam.city._id) &&
      (fault.valid && fieldTeam.faults.some(fieldTeamFault => fieldTeamFault._id === fault.value._id)) &&
      FieldTeam.compare(fieldTeam, input)
    );
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cityService: CityService,
    private readonly faultService: FaultService,
    private readonly fieldTeamService: FieldTeamService,
    protected readonly faultRecordService: FaultRecordService,
  ) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ready: [true, Validators.requiredTrue],

      city: [null, [Validators.required, mongoIdValidator]],
      fault: [null, [Validators.required, mongoIdValidator]],
      fieldTeam: [null, [mongoIdValidator]],
    });

    this.relations();

    if (this.params._id) {
      const subscription = this.faultRecordService.findById(this.params._id).subscribe(faultRecord => {
        this.patchFormData(faultRecord);
        this.unsubscribe(subscription);
      });

      this.addSubscription(subscription);
    }
  }

  submit($event: Event): void {
    super.submit($event, payload => {
      if (this.params._id) {
        return this.faultRecordService.update(this.params._id, payload);
      } else {
        return this.faultRecordService.create(payload);
      }
    });
  }

  relations() {
    const {city, fault, fieldTeam} = this.formGroup.controls;
    const truthy = () => filter<BaseEntity>(() => fieldTeam.valid && fieldTeam.value);

    this.addSubscription(
      merge(
        city.valueChanges.pipe(
          truthy(),
          filter(value => !value || value._id !== fieldTeam.value.city._id),
        ),
        fault.valueChanges.pipe(
          truthy(),
          filter(value => !value || !fieldTeam.value.faults.some(item => value._id === item._id)),
        ),
      ).subscribe(() => {
        fieldTeam.setValue(null);
      }),
    );
  }
}
