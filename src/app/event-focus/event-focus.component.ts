import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BoardService } from "../board.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TokenService } from "../token.service";
import { HttpClient } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';


@Component({
  selector: 'app-event-focus',
  templateUrl: './event-focus.component.html',
  styleUrls: ['./event-focus.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EventFocusComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  eventForm: FormGroup;
  event=<any>[];
  comments=<any>[];
  comment: string = '';
  editView: boolean = false;
  lat = this.eventForm['lat'];
  lon = this.eventForm['long'];
  key = '00726991e168c5c949d3066d0bc61089';
  baseWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?`

  displayedColumns: string[] = ['user', 'comment']
  addCommentView: boolean = false;
  commentForm: FormGroup;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getSingleEvent();
    this.eventForm = this.fb.group({
      type: new FormControl(),
      title: new FormControl(),
      date: new FormControl(),
      lat: new FormControl(),
      long: new FormControl(),
      location: new FormControl(),
      description: new FormControl(),
    })
    this.commentForm = this.fb.group({
      comment: new FormControl()
    })

    this.getComments()
  }
  getSingleEvent() {
    this.boardService.findSingleEvent().subscribe(singleEvent => {
      this.event = singleEvent
      console.log(singleEvent);
    })
  }
  updateEvent(id) {
    console.log(this.eventForm.value);
    this.boardService.updateUserEvent(this.eventForm.value, id).subscribe(event => {
      this.getSingleEvent();
    })
  
    this.editToggle();
  }
  deleteEvent(id:number) {
    let token = sessionStorage.getItem("token");
    let baseURL = `https://board-meeting-sever.herokuapp.com/event/delete/${id}`
    // this.http.delete(baseURL, httpOptions);
    fetch(baseURL, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }).then(() => {
      console.log(this.boardService.location)
      if(this.boardService.location === "http://localhost:4200/events") {
        this.router.navigate(["/events"])
      } else if(this.boardService.location === "http://localhost:4200/profile") {
        this.router.navigate(["/profile"])
      }
      })
  }   
  editToggle() {
    const _editView = !this.editView
    this.editView = _editView;
  }
  ngAfterViewInit() {
    this.token.sideNav = this.sideNav;
  }

  //WEATHER API FUNCTIONALITY
  fetchWeather(lat, lon, key, baseWeatherURL) {
    let weatherURL = baseWeatherURL + 'lat=' + lat + '&lon=' + lon + '&APPID=' + key;
    console.log(weatherURL)
    return this.http.get(weatherURL)

  }

  // showWeather(weatherURL) {
  //   this.fetchWeather(weatherURL)
  //   .subscribe(res => {
  //     this.
  //   })
  // }

  //ALL FUNCTIONALITY FOR COMMENTS

  //GETS ALL COMMENTS BY EVENT ID
  getComments() {
    let token = sessionStorage.getItem("token");
    let id = this.boardService.singleEvent;
    console.log(id);
    let baseURL = `https://board-meeting-sever.herokuapp.com/comments/all/${id}`
    fetch(baseURL, {
      method: "GET",
      headers: new Headers({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    })
    .then(res => res.json())
    .then(json => this.comments = json);
  }
  //CREATES BY EVENT ID
  createComment() {
    let token = sessionStorage.getItem("token");
    let commentString = JSON.stringify(this.commentForm.value);
    this.boardService.createComment(commentString).subscribe(comment => this.getComments())
      
  }

  //UPDATES BY COMMENT ID
  updateComment(id) {
    let token = sessionStorage.getItem("token");
    // let id = this.boardService.singleEvent;
    let baseURL = `https://board-meeting-sever.herokuapp.com/comments/update/${id}`;
    fetch(baseURL, {
      method: "PUT",
      body: JSON.stringify({
        comment: this.comment
      }),
      headers: new Headers({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    })
    .then(res => res.json())
    .then(comment => this.getComments());
  }

  //DELETE COMMENT BY COMMENT ID
  deleteComment(id) {
    let token = sessionStorage.getItem("token");
    // let id = this.boardService.singleEvent;
    let baseURL = `https://board-meeting-sever.herokuapp.com/comments/delete/${id}`;
    fetch(baseURL, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    })
    .then(() => this.getComments())
  }

  addCommentToggle() {
    const _addCommentView =!this.addCommentView
    this.addCommentView = _addCommentView
  }

  

}
