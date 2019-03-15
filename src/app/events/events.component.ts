import { Component, OnInit } from '@angular/core';
import { getToken } from '@angular/router/src/utils/preactivation';
import { TokenService } from "../token.service";
import { BoardService } from '../board.service'

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
    private boardService: BoardService
    ) { }

  ngOnInit() {
    this.sessionToken = this.token.getToken();
    this.admin = this.token.getAdmin();

    this.getAllEvents();

  }

  getAllEvents(){

    this.boardService.getAllEvents().subscribe(events => {
      this.events = events;
      console.log(events)
    });

  }

}