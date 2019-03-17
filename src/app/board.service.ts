import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  singleEvent: number;
  location: string;

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
  editUserEvents(id) {
    let token = sessionStorage.getItem("token");
    const httpOptions = {
      hesders: new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }
    const baseURL = `https://board-meeting-sever.herokuapp.com/event/update/${id}`;
    return this.http.put(baseURL, httpOptions);
  }

  findSingleEvent() {
    let token = sessionStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }
    const baseURL = `https://board-meeting-sever.herokuapp.com/event/event/${this.singleEvent}`
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
    let baseURL = `https://board-meeting-sever.herokuapp.com/event/update/${id}`
    return this.http.put(baseURL, eventString, httpOptions);
  }

  deleteUserEvent(id:number) {
    let token = sessionStorage.getItem("token");
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type" : "application/json",
    //     "Authorization": token
    //   })
    // }
    let baseURL = `https://board-meeting-sever.herokuapp.com/event/delete/${id}`
    // this.http.delete(baseURL, httpOptions);
    fetch(baseURL, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }).then(res => {console.log("test")})

  }

}
