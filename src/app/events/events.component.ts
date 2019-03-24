import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { TokenService } from "../token.service";
import { BoardService } from '../board.service';
import { CreateEventService } from '../create-event.service'
import { Router } from "@angular/router"
import { Injectable } from "@angular/core"
// import { puts } from 'util';
import { APIURL } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EventsComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  sessionToken: string = "";
  admin: string = "";
  type: "";
  events = <any>[];

  filter: FormGroup;

  constructor(
    private token: TokenService,
    private boardService: BoardService,
    private createEventService: CreateEventService,
    private router: Router,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.sessionToken = this.token.getToken();
    this.admin = this.token.getAdmin();

    this.getAllEvents();

    this.filter = this.fb.group({
      filter: new FormControl()
    })

  }

  viewEvent(id) {
    sessionStorage.setItem("id", id);
    console.log(id);
    this.boardService.location = window.location.href
    this.boardService.singleEvent = id;
    this.router.navigate(["/event-focus"]);
  }

  getAllEvents(){
    this.boardService.getAllEvents().subscribe(events => {
      this.events = events
      this.events.reverse();
      console.log(events);
    });
  }
  
  getByType() {
    console.log(this.filter.value.filter)
    if(this.filter.value.filter === "all") {
      this.getAllEvents();
    } else {
      this.boardService.getEventByType(this.filter.value.filter)
      .subscribe(events => {
        console.log(events)
        this.events = events;
        this.events.reverse();
      })
    }
  }

  ngAfterViewInit() {
    this.token.sideNav = this.sideNav;
  }

  
}