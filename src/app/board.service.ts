import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIURL } from '../environments/environment.prod';
import { EventFocusComponent } from '../app/event-focus/event-focus.component';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  singleEvent: number;
  location: string;

  urlForClass: string = "";
  navbarClass: string = ""

  getAllEvents(){

    let baseURL = `${APIURL}/event/all`;
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
    const userEventURL = `${APIURL}/event/user`
    return this.http.get(userEventURL, httpOptions)
    
  }

  navbarSwitch(){
    this.urlForClass = window.location.href;
    this.urlForClass === 'https://board-meeting-sever.herokuapp.com/home' ? this.navbarClass = 'navbarHome' : this.navbarClass =  'navbarOther' 
    console.log(this.navbarClass)
  }

  getEventByType(type) {
    let token = sessionStorage.getItem("token");
    let eventTypeURL = `${APIURL}/event/${type}`
    const httpOptions = {
      headers: new HttpHeaders ({
        "Content-Type": "application/json",
        "Authorization": token
      })
    }
    return this.http.get(eventTypeURL, httpOptions)
  }

  editUserEvents(id) {
    let token = sessionStorage.getItem("token");
    const httpOptions = {
      hesders: new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }
    const baseURL = `${APIURL}/event/update/${id}`;
    return this.http.put(baseURL, httpOptions);
  }

  findSingleEvent() {
    let token = sessionStorage.getItem("token");
    let id = sessionStorage.getItem("id")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }
    const baseURL = `${APIURL}/event/event/${this.singleEvent}`
    return this.http.get(baseURL, httpOptions);
  }
  
  updateUserEvent(eventString, id: number) {
    let token = sessionStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }
    let baseURL = `${APIURL}/event/update/${id}`
    return this.http.put(baseURL, eventString, httpOptions);
  }

  deleteUserEvent(id:number) {
    let token = sessionStorage.getItem("token");
    let baseURL = `${APIURL}/event/delete/${id}`
    // this.http.delete(baseURL, httpOptions);
    fetch(baseURL, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }).then(res => {console.log("test")})

  }

  createComment(commentString) {
    let token = sessionStorage.getItem("token");
    let id = this.singleEvent;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }
    console.log(commentString);
    let baseURL = `${APIURL}/comments/create/${id}`;
    return this.http.post(baseURL, commentString, httpOptions)
  }
}