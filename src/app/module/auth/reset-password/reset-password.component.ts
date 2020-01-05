import { Component, OnInit } from '@angular/core';
import { FormComponentHelper } from 'src/helper/form-component.helper';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/validator/form-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends FormComponentHelper implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ready: [true, Validators.requiredTrue],

      email: [null, [Validators.required, emailValidator]],
    });
  }

  submit($event: Event): void {
    super.submit($event, payload => this.authService.resetPassword(payload));
  }
}
