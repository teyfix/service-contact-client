import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponentHelper } from 'src/app/helper/form-component.helper';
import { AuthService } from 'src/app/service/auth/auth.service';
import { emailValidator, passwordValidator } from 'src/app/validator/form-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormComponentHelper implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ready: [true, Validators.requiredTrue],

      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator]]
    });
  }

  submit($event: Event) {
    super.submit($event, payload => this.authService.createSession(payload).toPromise());
  }
}
