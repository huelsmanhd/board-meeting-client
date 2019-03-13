import { Component, OnInit } from '@angular/core';
import { getToken } from '@angular/router/src/utils/preactivation';
import { TokenService } from "../token.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  sessionToken: string = "";
  admin: string = "";
  constructor(private token: TokenService) { }

  ngOnInit() {
    this.sessionToken = this.token.getToken();
    this.admin = this.token.getAdmin();
    // console.log(this.sessionToken)
    // console.log(this.admin)
  }

}
