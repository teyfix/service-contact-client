import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share, switchMap } from 'rxjs/operators';
import { transformAndValidate } from '../../helper/transform-and-validate';
import { Dealer } from './entity/dealer';
import { fromValidate } from '../../helper/from-validate';
import { CreateDealer } from './payload/create-dealer';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  constructor(private readonly httpClient: HttpClient) {
  }

  getDealers() {
    return this.httpClient.get('/dealer').pipe(
      transformAndValidate(Dealer, true),
      share()
    );
  }

  createDealer(createDealer: CreateDealer) {
    return fromValidate(CreateDealer, createDealer).pipe(
      switchMap(body => this.httpClient.post('/dealer', body)),
      transformAndValidate(Dealer),
      share()
    );
  }
}
