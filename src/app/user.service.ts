import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    console.log(user);
    const loginURL2 = 'http://localhost:3000/user/login'
    const loginURL = `https://board-meeting-server.herokuapp.com/user/login`
    return this.http.post(loginURL, user, httpOptions)
  }

  signupUser(newUser) {
    const signupURL2 = "http://localhost:3000/user/signup";
    const signupURL = 'https://board-meeting-server.herokuapp.com/user/signup';
    return this.http.post(signupURL2, newUser, httpOptions)
  }
}
