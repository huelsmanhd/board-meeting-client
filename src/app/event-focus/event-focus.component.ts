import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BoardService } from "../board.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TokenService } from "../token.service";
import { HttpClient } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { APIURL } from '../../environments/environment.prod';


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
  // lat = this.eventForm['lat'];
  // lon = this.eventForm['long'];
  // key = '00726991e168c5c949d3066d0bc61089';
  // baseWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?`

 

  displayedColumns: string[] = ['user', 'comment', 'buttons']
  addCommentView: boolean = false;
  commentForm: FormGroup;

  commentEditForm: FormGroup;
  editCommentView: boolean = false;
  editCommentViewArray = <any>{};

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

    this.commentEditForm = this.fb.group({
      comment: new FormControl()
    })

    this.getComments()
  }
  getSingleEvent() {
    this.boardService.findSingleEvent().subscribe(singleEvent => {
      this.event = singleEvent
      
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
    let baseURL = `${APIURL}/event/delete/${id}`
    // this.http.delete(baseURL, httpOptions);
    fetch(baseURL, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    }).then(() => {
      console.log(this.boardService.location)
      if(this.boardService.location === "https://board-meeting-client.herokuapp.com/events") {
        this.router.navigate(["/events"])
      } else if(this.boardService.location === "https://board-meeting-client.herokuapp.com/profile") {
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
  // fetchWeather(lat, lon, key, baseWeatherURL) {
  //   let weatherURL = baseWeatherURL + 'lat=' + lat + '&lon=' + lon + '&APPID=' + key;
  //   console.log(weatherURL)
  //   return this.http.get(weatherURL)

  // }

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
    let baseURL = `${APIURL}/comments/all/${id}`
    fetch(baseURL, {
      method: "GET",
      headers: new Headers({
        "Content-Type" : "application/json",
        "Authorization": token
      })
    })
    .then(res => res.json())
    .then(json => this.comments = json)
    .then(x => {
      x.forEach(test => {
        this.editCommentViewArray[`${test.id}`] = false;
      })
    })

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
    let stringComment = JSON.stringify(this.commentEditForm.value)
    console.log(stringComment)
    let baseURL = `${APIURL}/comments/update/${id}`;
    fetch(baseURL, {
      method: "PUT",
      body: stringComment,
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
    let baseURL = `${APIURL}/comments/delete/${id}`;
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

  editCommentToggle(commentIndex) {
    const _editCommentView =!this.editCommentViewArray[`${commentIndex}`]
    this.editCommentViewArray[`${commentIndex}`] = _editCommentView
    console.log(commentIndex)
    // this.editCommentViewArray[`${commentIndex.id}`] = false;
    // console.log(this.editCommentViewArray)
  } 

  editButtonCheck() {
    let username = sessionStorage.getItem("username");
    return username;
  }
  deleteButtonCheck() {
    let admin = sessionStorage.getItem("admin");
    if(admin === "true") {
      return true
    }
  }
  // navigateAway() {
  //   this.router.navigate[("/events")]
  // }

}
