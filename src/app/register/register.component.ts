import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../_interfaces/authenticated-response';
import { UserModel } from '../_interfaces/user-model';
import { CustomValidatorService } from '../_services/custom-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  isSubmitted = false;
  invalidRegister: boolean | undefined;
  invalidRegisterMessage: string | undefined;
  credentials: UserModel | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private customValidator: CustomValidatorService
  ) {
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
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
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          customValidator.validatorNoWhiteSpaces,
        ],
      ],
    });
  }

  register(form: FormGroup) {
    this.isSubmitted = true;
    this.invalidRegister = false;
    this.credentials = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      fname: this.form.get('fname')?.value,
      lname: this.form.get('lname')?.value,
      email: this.form.get('email')?.value,
    };

    if (form.valid) {
      this.http
        .post<AuthenticatedResponse>(
          'https://localhost:5001/api/auth/register',
          this.credentials,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            localStorage.setItem('jwt', token);
            this.invalidRegister = false;
            alert('თქვენ წარმატებით გაიარეთ რეგისტრაცია!');
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            this.invalidRegister = true;
            this.invalidRegisterMessage = err.error;
            this.isSubmitted = false;
          },
        });
    }
  }

  getInputStyle(s: string) {
    var dict: any = {};

    if (this.form.get(s)?.errors && this.isSubmitted) {
      dict['border-color'] = 'red';
    }
    return dict;
  }
}
