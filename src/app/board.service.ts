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



    fetch('https://board-meeting-sever.herokuapp.com/event/all', {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json"})
    })
  }
  
}