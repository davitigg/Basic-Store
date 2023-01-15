import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../_interfaces/authenticated-response';
import { LoginModel } from '../_interfaces/login-model';
import { CustomValidatorService } from '../_services/custom-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  invalidLogin: boolean | undefined;
  credentials: LoginModel | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private customValidator: CustomValidatorService
  ) {
    this.form = this.fb.group({
      username: [
        '',
        [Validators.required, customValidator.validatorNoWhiteSpaces],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(form: FormGroup) {
    this.isSubmitted = true;
    this.invalidLogin = false;
    this.credentials = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };

    if (form.valid) {
      this.http
        .post<AuthenticatedResponse>(
          'https://localhost:5001/api/auth/login',
          this.credentials,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            localStorage.setItem('jwt', token);
            this.invalidLogin = false;
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            this.invalidLogin = true;
            this.isSubmitted = false;
          },
        });
    }
  }

  logOut() {
    localStorage.removeItem('jwt');
  }

  getInputStyle(s: string) {
    var dict: any = {};

    if (this.form.get(s)?.errors && this.isSubmitted) {
      dict['border-color'] = 'red';
    }
    return dict;
  }
}
