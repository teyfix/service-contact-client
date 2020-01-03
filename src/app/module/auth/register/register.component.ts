import { Component, OnInit } from '@angular/core';
import { FormComponentHelper } from 'src/app/helper/form-component.helper';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { emailValidator, nameValidator, nameWithSpacesValidator, passwordValidator } from 'src/app/validator/form-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormComponentHelper implements OnInit {
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
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator]],
      firstName: ['', [Validators.required, nameWithSpacesValidator]],
      lastName: ['', [Validators.required, nameValidator]]
    });
  }

  submit($event: Event) {
    super.submit($event, payload => this.authService.createUser(payload).toPromise());
  }
}
