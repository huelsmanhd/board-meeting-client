import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BoardService } from "../board.service"
import { Router } from "@angular/router";
import { TokenService } from "../token.service";
import { APIURL } from '../../environments/environment.prod';
import {Injectable} from "@angular/core"


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav') sideNav: ElementRef;

  userEvents = <any>[];
  
  constructor(
    private boardService: BoardService,
    private router: Router,
    private token: TokenService,
    ) { }

  ngOnInit() {
    this.getUserEvents();
  }

  getUserEvents() {
    this.boardService.getUserEvents()
    .subscribe(events => {
      this.userEvents = events;
      this.userEvents.reverse();
      console.log(this.userEvents);
    })
  }

  viewEvent(id) {
    sessionStorage.setItem("id", id);
    this.boardService.location = window.location.href;
    this.boardService.singleEvent = id;
    this.router.navigate(["/event-focus"]);
    // console.log(window.location.href)
    
    
  }

  editEvent(id) {
    this.boardService.editUserEvents(id).subscribe(event => {
      console.log(event)
    })
  }

  ngAfterViewInit() {
    this.token.sideNav = this.sideNav;
  }

}
