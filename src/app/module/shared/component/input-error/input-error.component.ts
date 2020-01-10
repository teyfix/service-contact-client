import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent {
  @Input()
  errorState: string;

  @HostBinding('class.invalid-feedback')
  invalidFeedbackClass = true;
}
