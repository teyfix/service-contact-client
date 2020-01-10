import { HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { BooleanInput } from 'src/decorator/boolean-input';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BaseComponent } from 'src/helper/base-component';
import { distinctUntilChanged } from 'rxjs/operators';

export class BaseInput extends BaseComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  id = 'input-' + Math.random().toString(36).substring(2);

  @Input()
  type: 'text' | 'email' | 'password' | 'tel' = 'text';

  @Input()
  placeholder: string;

  @Input()
  hint: string;

  @BooleanInput()
  required = true;

  @HostBinding('class.form-group')
  formGroupClass = true;

  errorCode: string;
  formControl = new FormControl();

  constructor(private readonly ngControl: NgControl) {
    super();

    ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.ngControl.statusChanges.pipe(distinctUntilChanged()).subscribe(status => {
      if (status === 'VALID') {
        this.errorCode = null;
      } else {
        this.errorCode = Object.keys(this.ngControl.errors)[0];
      }
    });
  }

  writeValue(obj: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(value: any) {
  }

  onTouched() {
  }
}
