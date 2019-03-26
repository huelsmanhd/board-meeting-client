import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIURL } from '../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  loginUser(user) {
    const loginURL2 = 'http://localhost:3000/user/login'
    const loginURL = `${APIURL}/user/login`
    // console.log(window.location.hostname)
    return this.http.post(loginURL, user, httpOptions)

  }

  signupUser(newUser) {
    const signupURL2 = "http://localhost:3000/user/signup";
    const signupURL = `${APIURL}/user/signup`;
    //'https://board-meeting-sever.herokuapp.com/user/signup'
    return this.http.post(signupURL, newUser, httpOptions)
  }
}
