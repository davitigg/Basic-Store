import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../_interfaces/authenticated-response';
import { LoginModel } from '../_interfaces/login-model';

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
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, this.validatorWhiteSpaces]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  validatorWhiteSpaces(fc: FormControl) {
    const value = fc.value as string;
    const isWhitespace = value.trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

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
}
