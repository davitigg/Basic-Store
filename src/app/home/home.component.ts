import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatedResponse } from '../_interfaces/authenticated-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    return false;
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
