import { Component, OnInit } from '@angular/core';
import { TokenService } from "../token.service";
import { Router, RouterLink } from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { BoardService } from '../board.service';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  sessionToken: string = "";
  admin: string = "";
  
  
  logoutButton = false;
  constructor(
    public token: TokenService,
    public boardService: BoardService,
    private router: Router,
    ) { }

  ngOnInit() {
    // this.sessionToken = sessionStorage.getItem("token");
    this.sessionToken = this.token.getToken();
    // this.admin = this.token.getAdmin();
    this.admin = this.token.getAdmin();
    this.viewCreateEvent();
    this.token.toggleSideNav();
  }

  logoutView() {
    if(sessionStorage.getItem("token") === null) {
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(["/home"]);
    this.token.clearSessionToken();
     
  }
  signUp() {
    this.token.number = 1;
  }
  login() {
    this.token.number = 0;
  }
  

  viewCreateEvent() {
    // if (window.location.href === 'http://localhost:4200/home') {
    
    if (window.location.href === 'https://board-meeting-client.herokuapp.com/home') {
    return false;
  } else {
    return true;
  }
  }
  
}
