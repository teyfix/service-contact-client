import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/helper/base-component';
import { Paginator } from 'src/app/service/paginate/paginator';
import { Dealer } from 'src/app/service/dealer/entity/dealer';
import { DealerService } from 'src/app/service/dealer/dealer.service';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
})
export class DealerComponent extends BaseComponent implements OnInit {
  dealers: Paginator<Dealer>;

  constructor(private readonly dealerService: DealerService) {
    super();
  }

  ngOnInit() {
    this.dealers = this.dealerService.paginate();
  }
}
