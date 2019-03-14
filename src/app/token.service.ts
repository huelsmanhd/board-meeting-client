import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  sessionToken: string = '';
  admin: string = "";

  

  constructor(private http: HttpClient) { }

  storeSession( admin, token, username ) {
    sessionStorage.setItem('admin', admin)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('username', username)
    this.sessionToken = token
    this.admin = sessionStorage.getItem(("admin"));
    console.log(this.sessionToken)
    console.log(this.admin);
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
  

}
