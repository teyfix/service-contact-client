import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { City } from 'src/app/service/location/entity/city';
import { BaseService } from 'src/app/service/base/base.service';
import { CreateFaultDto } from 'src/app/service/fault/dto/create-fault.dto';
import { UpdateFaultDto } from 'src/app/service/fault/dto/update-fault.dto';

@Injectable({
  providedIn: 'root',
})
export class CityService extends BaseService<City> {
  prefix = 'city';
  entity = City;
  CreateDto = CreateFaultDto;
  UpdateDto = UpdateFaultDto;

  typeahead(): OperatorFunction<string, City[]> {
    return super.typeahead(City.compare, City.sort);
  }
}
