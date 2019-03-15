import { Component, OnInit } from '@angular/core';
import { BoardService } from "../board.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-event-focus',
  templateUrl: './event-focus.component.html',
  styleUrls: ['./event-focus.component.css']
})
export class EventFocusComponent implements OnInit {

  modal = false;

  constructor(
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.boardService.findSingleEvent().subscribe(singleEvent => {
      console.log(singleEvent);
    })
  }

  toggleModal() {
    this.modal = true;
  }

  updateEvent(id) {
    this.boardService.updateUserEvent(id)
    this.router.navigate(["/profile"])
  }

}
