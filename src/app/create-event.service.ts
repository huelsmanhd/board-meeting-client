import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  constructor(private http: HttpClient) { }

  createEvent(newEvent) {
    console.log(event);
    const createURL2 = 'http://localhost:3000/event/create'
    const createURL = `https://board-meeting-sever.herokuapp.com/event/create`
    return this.http.post(createURL, newEvent, httpOptions)
  }
}