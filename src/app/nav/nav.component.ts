import { Component, OnInit } from '@angular/core';
import { TokenService } from "../token.service";
import { Router } from "@angular/router";


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
    private token: TokenService,
    private router: Router) { }

  ngOnInit() {
    // this.sessionToken = sessionStorage.getItem("token");
    this.sessionToken = this.token.getToken();
    // this.admin = this.token.getAdmin();
    this.admin = this.token.getAdmin();

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
}
