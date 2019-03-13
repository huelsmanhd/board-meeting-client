import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup
  signupForm: FormGroup

  loginView: boolean = true;

  constructor(
    private userService: UserService,
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
  }

  login() {
    const loginString = JSON.stringify(this.loginForm.value)
    // console.log(this.loginForm.value, this.loginForm.value.email, this.loginForm.value.password);
    this.userService.loginUser(loginString)
    .subscribe(res => {
      console.log(res)
      this.tokenService.storeSession(res["user"].admin, res["sessionToken"])
      this.router.navigate(["/events"]);
    }) 
  }
  signup() {
    this.userService.signupUser(this.signupForm.value)
    .subscribe(res => {
      console.log(res)
      this.tokenService.storeSession(res["user"].admin, res["sessionToken"])
      this.router.navigate(["/events"]);
    })
  }

  newUser() {
    const _loginView = !this.loginView
    this.loginView = _loginView
  }

}
