import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateEventComponent } from './create-event/create-event.component'
import { EventFocusComponent } from "./event-focus/event-focus.component";
import { TokenService as tokenservice } from './token.service';
import { JwtModule } from '@auth0/angular-jwt';
// import { JwtHelperService } from '@auth0/angular-jwt'

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'events', component: EventsComponent, canActivate: [tokenservice]},
  {path: 'profile', component: ProfileComponent, canActivate: [tokenservice]},
  {path: 'create', component: CreateEventComponent, canActivate: [tokenservice]},
  {path: 'event-focus', component: EventFocusComponent, canActivate: [tokenservice]}
];

export function getToken(): string {
  return sessionStorage.getItem('token');
}

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    JwtModule.forRoot({
    config: {
      tokenGetter: getToken
    }
  }),],
  exports: [RouterModule],
})
export class AppRoutingModule { }