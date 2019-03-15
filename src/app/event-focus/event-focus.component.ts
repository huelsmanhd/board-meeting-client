import { Component, OnInit } from '@angular/core';
import { BoardService } from "../board.service";

@Component({
  selector: 'app-event-focus',
  templateUrl: './event-focus.component.html',
  styleUrls: ['./event-focus.component.css']
})
export class EventFocusComponent implements OnInit {

  event=<any>[];

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit() {
    this.boardService.findSingleEvent().subscribe(singleEvent => {
      this.event = singleEvent
      console.log(singleEvent);
    })
  }

}
