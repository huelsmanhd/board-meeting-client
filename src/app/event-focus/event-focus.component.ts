import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BoardService } from "../board.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TokenService } from "../token.service";


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
  editView: boolean = false;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenService,
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

  deleteEvent(id) {
    this.boardService.deleteUserEvent(id).subscribe(event => {
      this.router.navigate(["/profile"]);
      alert("You deleted an event!");
    })
  }

  editToggle() {
    const _editView = !this.editView
    this.editView = _editView

  }

  ngAfterViewInit() {
    this.token.sideNav = this.sideNav;
  }

}
