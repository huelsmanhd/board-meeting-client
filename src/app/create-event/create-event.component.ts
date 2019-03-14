import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEventService } from '../create-event.service'

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup

  constructor(
    private createEventService: CreateEventService,
    private fb: FormBuilder,
    private router: Router
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

  createEvent() {

    const eventString = JSON.stringify
    (this.eventForm.value)
    
    this.createEventService.createEvent(eventString)
    
  }

}