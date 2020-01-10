import { Component, Input } from '@angular/core';
import { BaseInput } from 'src/app/module/shared/component/base-input/base-input';
import { NgControl } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ngbTypeahead = Symbol();

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],
})
export class CheckListComponent extends BaseInput {
  selectedItems: any[] = ['test item'];

  constructor(ngControl: NgControl) {
    super(ngControl);
  }

  @Input()
  set ngbTypeahead(value: (text: Observable<string>) => Observable<any[]>) {
    if ('function' === typeof value) {
      this[ngbTypeahead] = (text: Observable<string>) => {
        return value(text).pipe(
          map(items => items.filter(item => this.selectedItems.indexOf(item) === -1)),
        );
      };
    } else {
      this[ngbTypeahead] = value;
    }
  }

  get ngbTypeahead(): (text: Observable<string>) => Observable<any[]> {
    return this[ngbTypeahead];
  }

  onSelectItem($event: NgbTypeaheadSelectItemEvent) {
    console.log('checklist.onselectitem:', $event.item);

    const item = $event.item;

    if (item == null || this.selectedItems.includes(item)) {
      return;
    }

    this.selectedItems.push(item);
    this.onChange(this.selectedItems);

    setTimeout(() => this.formControl.setValue(null));
  }

  removeItem(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
  }

  writeValue(obj: object[]): void {
    if (obj == null) {
      obj = [];
    }

    if (obj instanceof Array) {
      this.selectedItems = obj;
    }
  }
}
