import { Component, OnInit } from '@angular/core';
import { FormComponentHelper } from 'src/helper/form-component.helper';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import {
  emailValidator,
  nameValidator,
  nameWithSpacesValidator,
  passwordValidator,
} from 'src/validator/form-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormComponentHelper implements OnInit {
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
      password: [null, [Validators.required, Validators.minLength(6), passwordValidator]],
      firstName: [null, [Validators.required, nameWithSpacesValidator]],
      lastName: [null, [Validators.required, nameValidator]],
    });
  }

  submit($event: Event) {
    super.submit($event, payload => this.authService.createUser(payload));
  }
}
