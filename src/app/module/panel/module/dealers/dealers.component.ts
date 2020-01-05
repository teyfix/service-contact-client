import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/helper/base-component';
import { DealerService } from 'src/app/service/dealer/dealer.service';
import { Paginator } from 'src/app/service/paginate/paginator';
import { Dealer } from 'src/app/service/dealer/entity/dealer';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss'],
})
export class DealersComponent extends BaseComponent implements OnInit {
  dealers: Paginator<Dealer>;

  constructor(private readonly dealerService: DealerService) {
    super();
  }

  ngOnInit() {
    this.dealers = this.dealerService.paginate();
  }
}
