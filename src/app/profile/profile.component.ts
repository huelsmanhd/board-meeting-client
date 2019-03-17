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
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  userEvents: Array<any> = [];
  
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
      console.log(events);
      // this.userEvents = events;
    })
  }

  viewEvent(id) {
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
