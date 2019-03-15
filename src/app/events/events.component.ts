import { Component, OnInit } from '@angular/core';
import { getToken } from '@angular/router/src/utils/preactivation';
import { TokenService } from "../token.service";
import { BoardService } from '../board.service';
import { CreateEventService } from '../create-event.service'
import { Router } from "@angular/router"

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

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
    this.boardService.setSingleEventId(id);
    this.router.navigate(["/event-focus"]);
  }

  getAllEvents(){
    this.boardService.getAllEvents().subscribe(events => {
      this.events = events;
      console.log(events)
    });
  }
  

}