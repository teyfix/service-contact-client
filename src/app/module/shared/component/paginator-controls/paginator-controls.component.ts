import { Component, Input, OnInit } from '@angular/core';
import { Paginator } from 'src/app/service/paginate/paginator';
import { BooleanInput } from 'src/decorator/boolean-input';

@Component({
  selector: 'app-paginator-controls',
  templateUrl: './paginator-controls.component.html',
  styleUrls: ['./paginator-controls.component.scss'],
})
export class PaginatorControlsComponent implements OnInit {
  @Input()
  paginator: Paginator<any>;

  @BooleanInput()
  showTop = true;

  @BooleanInput()
  showBottom = true;

  constructor() {
  }

  ngOnInit() {
  }

}
