import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BoardService } from "../board.service"
import { Router } from "@angular/router";
import { TokenService } from "../token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
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
    this.boardService.getUserEvents().subscribe(events => {
      this.userEvents = events;
      console.log(this.userEvents);
    })
  }

  viewEvent(id) {
    this.boardService.location = window.location.href;
    console.log(window.location.href)
    this.boardService.setSingleEventId(id);
    this.router.navigate(["/event-focus"]);
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
