import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  getAllEvents(){

    let baseURL = 'https://board-meeting-sever.herokuapp.com/event/all';
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      })
    }

    return this.http.get(baseURL, httpOptions)
  }

  getUserEvents() {
    let token = sessionStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }
    const userEventURL = `https://board-meeting-sever.herokuapp.com/event/user`
    return this.http.get(userEventURL, httpOptions)
  }

}
