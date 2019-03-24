import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEventService } from '../create-event.service'
import { TokenService } from '../token.service';
import { EventsComponent } from "../events/events.component";
import { ProfileComponent } from "../profile/profile.component"

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateEventComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  eventForm: FormGroup

  constructor(
    private createEventService: CreateEventService,
    private fb: FormBuilder,
    private router: Router,
    public token: TokenService,
    public events: EventsComponent,
    public profile: ProfileComponent
  ) { }

  ngOnInit() {
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

  closeSideNav() {

  }

  createEvent() {
    let date =  this.eventForm.value["date"].getDate()
    let month = this.eventForm.value["date"].getMonth() + 1;
    let year = this.eventForm.value["date"].getFullYear()
    let eventDate = `${year}-${month}-${date}`;
    this.eventForm.value["date"] = eventDate;

    // console.log(this.eventForm.value);
    let eventString = JSON.stringify(this.eventForm.value);
    this.createEventService.createEvent(eventString).subscribe(event => {
      console.log(event);
      this.events.getAllEvents();
      this.profile.getUserEvents();
      
    })
   
  }
  

  ngAfterViewInit() {
    this.token.sideNav = this.sideNav;
  }

}
