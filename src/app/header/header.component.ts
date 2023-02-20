import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService
  ) {}

  userLoggedIn() {
    const token = localStorage.getItem('jwt');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
  logOut() {
    this.authService.logOut();
  }
}
