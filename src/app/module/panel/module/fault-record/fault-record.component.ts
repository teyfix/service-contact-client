import { Component, OnInit } from '@angular/core';
import { FaultRecord } from 'src/app/service/fault-record/entity/fault-record';
import { Paginator } from 'src/app/service/paginate/paginator';
import { FaultRecordService } from 'src/app/service/fault-record/fault-record.service';

@Component({
  selector: 'app-fault-record',
  templateUrl: './fault-record.component.html',
  styleUrls: ['./fault-record.component.scss'],
})
export class FaultRecordComponent implements OnInit {
  faultRecords: Paginator<FaultRecord>;

  constructor(private readonly faultRecordService: FaultRecordService) {
  }

  ngOnInit() {
    this.faultRecords = this.faultRecordService.paginate();
  }

}
