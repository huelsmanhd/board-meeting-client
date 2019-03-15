import { Component, OnInit } from '@angular/core';
import { BoardService } from "../board.service"
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private boardService: BoardService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getUserEvents();
  }

  getUserEvents() {
    this.boardService.getUserEvents().subscribe(userEvents => {
      console.log(userEvents);
    })
  }

  viewEvent(id) {
    this.boardService.setSingleEventId(id);
    this.router.navigate(["/event-focus"]);
  }

  editEvent(id) {
    this.boardService.editUserEvents(id).subscribe(event => {
      console.log(event)
    })
  }

}
