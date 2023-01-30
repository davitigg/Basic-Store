import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../_interfaces/authenticated-response';
import { LoginModel } from '../_interfaces/login-model';
import { UserModel } from '../_interfaces/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  invalidLogin: boolean | undefined;
  constructor(private router: Router, private http: HttpClient) {}

  login(form: FormGroup) {
    var credentials: LoginModel = {
      email: form.get('email')?.value,
      password: form.get('password')?.value,
    };

    if (form.valid) {
      this.http
        .post<AuthenticatedResponse>(
          'https://localhost:5001/api/auth/login',
          credentials,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            localStorage.setItem('jwt', token);
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            alert(
              'დაფიქსირდა შეცდომა!\nგთხოვთ შეამოწმოთ მომხმარებელი და პაროლი.'
            );
          },
        });
    } else alert('დაფიქსირდა შეცდომა!\nგთხოვთ შეიყვანოთ ვალიდური მონაცმები.');
  }

  register(form: FormGroup) {
    var credentials: UserModel = {
      email: form.get('email')?.value,
      password: form.get('password')?.value,
      fname: form.get('fname')?.value,
      lname: form.get('lname')?.value,
    };

    if (form.valid) {
      this.http
        .post<AuthenticatedResponse>(
          'https://localhost:5001/api/auth/register',
          credentials,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            localStorage.setItem('jwt', token);
            alert('თქვენ წარმატებით გაიარეთ რეგისტრაცია!');
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            alert(`დაფიქსირდა შეცდომა!\n ${err.error}.`);
          },
        });
    } else {
      alert('დაფიქსირდა შეცდომა!\nგთხოვთ შეიყვანოთ ვალიდური მონაცმები.');
    }
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }

  deleteUser() {
    this.http
      .delete('https://localhost:5001/api/auth/delete', {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: () => {
          localStorage.removeItem('jwt');
          alert('თქვენი მომხმარებელი წაიშალა!');
          this.router.navigate(['login']);
        },
      });
  }
}
