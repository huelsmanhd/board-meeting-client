import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { TokenService } from "../token.service";
import { BoardService } from '../board.service';
import { CreateEventService } from '../create-event.service'
import { Router } from "@angular/router"
import { Injectable } from "@angular/core"


@Injectable({
  providedIn: 'root'
})

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
    private createEventService: CreateEventService,
    private router: Router
    ) { }

  ngOnInit() {
    this.sessionToken = this.token.getToken();
    this.admin = this.token.getAdmin();

    this.getAllEvents();

  }

  viewEvent(id) {
    this.boardService.location = window.location.href
    this.boardService.singleEvent = id;
    this.router.navigate(["/event-focus"]);
  }

  getAllEvents(){
    this.boardService.getAllEvents().subscribe(events => {
      this.events = events;
      this.events.reverse();
      console.log(events)
    });
  }
  
  ngAfterViewInit() {
    this.token.sideNav = this.sideNav;
  }
}