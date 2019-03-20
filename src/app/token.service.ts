import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate } from '@angular/router';
import { APIURL } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  sessionToken: string = '';
  admin: string = "";
  public sideNav: any;
  

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) { }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token)
  }

  public canActivate(): boolean  {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  storeSession( admin, token, username ) {
    sessionStorage.setItem('admin', admin)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('username', username)
    this.sessionToken = token
    this.admin = sessionStorage.getItem(("admin"));
    // console.log(this.sessionToken)
    // console.log(this.admin);
  }

  getToken() {
    return sessionStorage.getItem("token");
  }
  getAdmin() {
    return sessionStorage.getItem("admin");
  }
  clearSessionToken() {
    this.sessionToken = "";
  }

  public openNav() {
    this.sideNav.open();
  }

  public closeNav() {
    this.sideNav.close();
  }

  public toggleSideNav() {
    this.sideNav.toggle();
  }

}
