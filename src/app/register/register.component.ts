import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CustomValidatorService } from '../_services/custom-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private customValidator: CustomValidatorService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          customValidator.validatorNoWhiteSpaces,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          customValidator.validatorNoWhiteSpaces,
        ],
      ],
      fname: [
        '',
        [Validators.required, customValidator.validatorNoWhiteSpaces],
      ],
      lname: [
        '',
        [Validators.required, customValidator.validatorNoWhiteSpaces],
      ],
    });
  }

  register(form: FormGroup) {
    this.authService.register(form);
  }
}
