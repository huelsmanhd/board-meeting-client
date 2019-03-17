import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { BoardService } from './board.service'
import { tokenKey } from '@angular/core/src/view';


@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  events = <any>[];
  
  constructor(
    private http: HttpClient,
    private boardService: BoardService
    ) { }
  
  createEvent(newEvent) {
    let token = sessionStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }
    console.log(token);
    const createURL2 = 'http://localhost:3000/event/create'
    const createURL = `https://board-meeting-sever.herokuapp.com/event/create`
    return this.http.post(createURL, newEvent, httpOptions)
  }

}