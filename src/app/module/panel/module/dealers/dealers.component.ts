import { Component, OnInit } from '@angular/core';
import { DealerService } from 'src/app/service/dealer/dealer.service';
import { Observable } from 'rxjs';
import { Dealer } from 'src/app/service/dealer/entity/dealer';
import { BaseComponent } from 'src/helper/base-component';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss'],
})
export class DealersComponent extends BaseComponent implements OnInit {
  dealers: Observable<Dealer[]>;

  constructor(private readonly dealerService: DealerService) {
    super();
  }

  ngOnInit() {
    this.dealers = this.dealerService.dealers;
  }
}
