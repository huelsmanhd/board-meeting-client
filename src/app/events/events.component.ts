import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { getToken } from '@angular/router/src/utils/preactivation';
import { TokenService } from "../token.service";
import { BoardService } from '../board.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  sessionToken: string = "";
  admin: string = "";

  events = <any>[];

  constructor(
    private token: TokenService,
    private boardService: BoardService,
    private router: Router
    ) { }

  ngOnInit() {
    this.sessionToken = this.token.getToken();
    this.admin = this.token.getAdmin();

    this.getAllEvents();

  }

  viewEvent(id) {
    this.boardService.location = window.location.href
    this.boardService.setSingleEventId(id);
    this.router.navigate(["/event-focus"]);
  }

  getAllEvents(){
    this.boardService.getAllEvents().subscribe(events => {
      this.events = events;
      console.log(events)
    });
  }
  
  ngAfterViewInit() {
    this.token.sideNav = this.sideNav;
  }
}