import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginator } from 'src/app/service/paginate/paginator';
import { BaseEntity } from 'src/app/service/base/entity/base.entity';
import { child } from 'src/helper/child';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T extends BaseEntity> implements OnInit {
  @Input()
  source: Paginator<T>;

  @Input()
  prefix: string;

  @Input()
  headings: Array<keyof T>;

  @Output()
  delete = new EventEmitter<string | string[]>();

  selected: { [key: string]: boolean };

  get count() {
    return Object.values(this.selected).filter(Boolean).length;
  }

  ngOnInit() {
  }

  child(item: T, childPath: string | string[]) {
    return child(item, childPath);
  }

  toggleSelect() {
    this.selected = this.selected ? null : {};
  }

  deleteSelected() {
    this.delete.next(
      Object
        .entries(this.selected)
        .filter(([, value]) => value)
        .map(([key]) => key),
    );

    this.toggleSelect();
  }
}
