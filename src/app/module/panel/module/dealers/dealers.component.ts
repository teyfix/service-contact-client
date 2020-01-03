import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../../../service/dealer/dealer.service';
import { Observable } from 'rxjs';
import { Dealer } from '../../../../service/dealer/entity/dealer';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent implements OnInit {
  dealers: Observable<Dealer[]>;

  constructor(private readonly dealerService: DealerService) {
  }

  ngOnInit() {
    this.dealers = this.dealerService.getDealers();
  }
}
