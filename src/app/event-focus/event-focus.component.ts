import { Component, OnInit } from '@angular/core';
import { BoardService } from "../board.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-event-focus',
  templateUrl: './event-focus.component.html',
  styleUrls: ['./event-focus.component.css']
})
export class EventFocusComponent implements OnInit {

  
  eventForm: FormGroup;
  event=<any>[];
  editView: boolean = false;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private fb: FormBuilder
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

  deleteEvent(location, id) {
    
    this.boardService.deleteUserEvent(id);
    // console.log(window.location);
    // console.log(document.referrer)
    this.router.navigate(["/profile"]);
    // history.back();
    alert(`You removed event ${id}`)
  }

  editToggle() {
    const _editView = !this.editView
    this.editView = _editView

  }

}
