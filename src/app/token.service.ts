import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  sessionToken: string = '';

  constructor(private http: HttpClient) { }

  storeSession( {admin}, token ) {
    sessionStorage.setItem('admin', admin)
    sessionStorage.setItem('token', token)
    this.sessionToken = token
  }
}
