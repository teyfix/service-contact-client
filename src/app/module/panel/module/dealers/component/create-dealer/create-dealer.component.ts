import { Component, OnInit } from '@angular/core';
import { FormComponentHelper } from 'src/helper/form-component.helper';
import { FormBuilder, Validators } from '@angular/forms';
import { mongoIdValidator, nameWithSpacesValidator, phoneValidator } from 'src/validator/form-validator';
import { DealerService } from 'src/app/service/dealer/dealer.service';
import { filter, pluck } from 'rxjs/operators';
import { CityService } from 'src/app/service/location/city.service';
import { City } from 'src/app/service/location/entity/city';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-create-dealer',
  templateUrl: './create-dealer.component.html',
  styleUrls: ['./create-dealer.component.scss'],
})
export class CreateDealerComponent extends FormComponentHelper implements OnInit {
  search: OperatorFunction<string, City[]>;

  constructor(
    private readonly router: Router,
    private readonly cityService: CityService,
    private readonly formBuilder: FormBuilder,
    private readonly dealerService: DealerService,
    private readonly ngbActiveModal: NgbActiveModal,
  ) {
    super();

    this.search = cityService.typeahead();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ready: [true, Validators.requiredTrue],

      title: [null, [Validators.required, nameWithSpacesValidator]],
      phone: [null, [Validators.required, phoneValidator]],
      city: [null, [Validators.required, mongoIdValidator]],
    });

    this.subscriptions.add(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        pluck('urlAfterRedirects'),
        filter(url => url !== '/panel/dealers/create'),
      ).subscribe(() => this.ngbActiveModal.close()),
    );
  }

  submit($event: Event): void {
    super.submit($event, payload => {
      return this.dealerService.createDealer({...payload, city: payload.city._id});
    });
  }

  formatResult = (city: City) => city.title;
}
