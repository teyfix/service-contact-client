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
  select = false;
  dealers: Paginator<Dealer>;

  constructor(private readonly dealerService: DealerService) {
    super();
  }

  get selectedCount() {
    return this.dealers.data.filter(_ => _.checked).length;
  }

  ngOnInit() {
    this.dealers = this.dealerService.paginate();
  }

  toggleSelect() {
    this.select = !this.select;

    if (this.dealers.data instanceof Array) {
      this.dealers.data.forEach(dealer => dealer.checked = false);
    }
  }

  delete(dealer: Dealer) {
    this.dealerService.delete(dealer).then(() => void 0);
  }

  deleteSelected() {
    this.dealerService.deleteBatch(this.dealers.data.filter(({checked}) => checked)).then(() => void 0);
    this.toggleSelect();
  }
}
