import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';
import { OnlyLoggedOffUsersGuard } from './guards/only-logged-off-users.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RegisterComponent } from './register/register.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [OnlyLoggedOffUsersGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [OnlyLoggedOffUsersGuard],
  },
  {
    path: 'profile',
    component: ProfileEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'weather',
    component: WeatherForecastComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
