import { Component, OnInit } from '@angular/core';
import { BaseInput } from 'src/app/module/shared/component/base-input/base-input';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends BaseInput implements OnInit {
  constructor(ngControl: NgControl) {
    super(ngControl);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  ngOnInit() {
    super.ngOnInit();

    this.addSubscription(
      this.formControl.valueChanges.subscribe(value => {
        this.onChange(value);
      }),
    );
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
  }
}
