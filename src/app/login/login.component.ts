import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { BoardService } from '../board.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  error: boolean = false;
  message: string = "";

  loginForm: FormGroup
  signupForm: FormGroup

  loginView: boolean = true;

  constructor(
    private userService: UserService,
    private boardService: BoardService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl()
    })

    this.signupForm = this.fb.group({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
    this.boardService.navbarSwitch()
  }

  login() {
    const loginString = JSON.stringify(this.loginForm.value)
    // console.log(this.loginForm.value, this.loginForm.value.email, this.loginForm.value.password);
    this.userService.loginUser(loginString)
    .subscribe(res => {
      // console.log(res)
      if(res["status"] === 502) {
        this.error = true;
        this.message = "Your password doesn't seem to match our records. Please re-enter your password"
      } else if (res["status"] === 500) {
        this.error = true;
        this.message = "Not valid user. Please sign Up!"
      } else {
        this.error = false;
        this.tokenService.storeSession(res["user"].admin, res["sessionToken"], res["user"].username)
        this.router.navigate(["/home"]);
      }
    }) 
  }
  
  signup() {
    // console.log(this.signupForm.value.email.indexOf("@") === -1)
    if(this.signupForm.value.email.indexOf("@") === -1) {
      this.error = true;
      this.message = "Need valid email address!"
    } else {
    this.userService.signupUser(this.signupForm.value)
    .subscribe(res => {
      if (res["status"] === 500) {
        this.error = true;
        this.message = "Email already exists in our system"
      } else {
      this.error = false;
      this.tokenService.storeSession(res["user"].admin, res["sessionToken"], res["user"].username)
      this.router.navigate(["/home"]);
    }})

  }
}
  newUser() {
    this.error = false;
    const _loginView = !this.loginView
    this.loginView = _loginView
  }
  
}