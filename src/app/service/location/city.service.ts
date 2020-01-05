import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { City } from 'src/app/service/location/entity/city';
import { debounceTime, map, shareReplay, switchMap } from 'rxjs/operators';
import { transformAndValidate } from 'src/helper/transform-and-validate';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private readonly httpClient: HttpClient) {
  }

  cities = this.httpClient.get<object[]>('/city').pipe(
    transformAndValidate(City),
    shareReplay(1),
  );

  typeahead(): OperatorFunction<string, City[]> {
    return (input: Observable<string>) => {
      return input.pipe(
        debounceTime(50),
        map(text => text.toLocaleLowerCase()),
        switchMap(text => this.cities.pipe(City.filter(text), City.sort(text))),
      );
    };
  }
}
