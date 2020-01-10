import { Component, OnInit } from '@angular/core';
import { Paginator } from 'src/app/service/paginate/paginator';
import { Fault } from 'src/app/service/fault/entity/fault';
import { FaultService } from 'src/app/service/fault/fault.service';

@Component({
  selector: 'app-fault',
  templateUrl: './fault.component.html',
  styleUrls: ['./fault.component.scss'],
})
export class FaultComponent implements OnInit {
  faults: Paginator<Fault>;

  constructor(private readonly faultService: FaultService) {
  }

  ngOnInit() {
    this.faults = this.faultService.paginate();
  }

}
