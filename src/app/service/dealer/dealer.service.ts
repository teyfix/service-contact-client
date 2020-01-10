import { Injectable } from '@angular/core';
import { Dealer } from './entity/dealer';
import { CreateDealerDto } from 'src/app/service/dealer/dto/create-dealer.dto';
import { UpdateDealerDto } from 'src/app/service/dealer/dto/update-dealer.dto';
import { BaseService } from 'src/app/service/base/base.service';

@Injectable({
  providedIn: 'root',
})
export class DealerService extends BaseService<Dealer> {
  entity = Dealer;
  prefix = 'dealer';
  CreateDto = CreateDealerDto;
  UpdateDto = UpdateDealerDto;
}
