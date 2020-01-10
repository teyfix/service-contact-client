import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BaseInput } from 'src/app/module/shared/component/base-input/base-input';
import { Observable } from 'rxjs';
import { ResultTemplateContext } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { BooleanInput } from 'src/decorator/boolean-input';
import { NgControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent extends BaseInput implements OnInit {
  @Input()
  autocomplete: string;

  @Input()
  container: string;

  @BooleanInput()
  editable = false;

  @BooleanInput()
  focusFirst: boolean;

  @Input()
  inputFormatter: (item: any) => string;

  @Input()
  ngbTypeahead: (text: Observable<string>) => Observable<any[]>;

  @Input()
  resultTemplate: TemplateRef<ResultTemplateContext>;

  @BooleanInput()
  showHint: boolean;

  @Input()
  placement: PlacementArray = 'bottom-left bottom-right top-left top-right';

  @Input()
  resultFormatter: (item: any) => string;

  @Output()
  selectItem = new EventEmitter<NgbTypeaheadSelectItemEvent>();

  // tslint:disable-next-line:no-output-native
  @Output()
  blur = new EventEmitter<FocusEvent>();

  value;

  constructor(ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.addSubscription(
      this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
        if (value === '') {
          value = null;
        }

        if (value == null) {
          if (this.value == null) {
            return;
          }

          this.onSelectItem({item: null, preventDefault: () => null});
        }
      }),
    );
  }

  onBlur($event: FocusEvent) {
    if (!this.editable && this.value !== this.formControl.value) {
      this.formControl.setValue(this.value);
    }

    this.onTouched();
    this.blur.next($event);
  }

  writeValue(obj): void {
    this.value = obj;
    this.formControl.setValue(obj);
  }

  onSelectItem($event: NgbTypeaheadSelectItemEvent) {
    this.value = $event.item;
    this.onChange($event.item);
    this.selectItem.next($event);
  }
}
