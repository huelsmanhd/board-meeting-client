import { Component, OnInit } from '@angular/core';
import { BoardService } from "../board.service";

@Component({
  selector: 'app-event-focus',
  templateUrl: './event-focus.component.html',
  styleUrls: ['./event-focus.component.css']
})
export class EventFocusComponent implements OnInit {

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit() {
    this.boardService.findSingleEvent().subscribe(singleEvent => {
      console.log(singleEvent);
    })
  }

}
