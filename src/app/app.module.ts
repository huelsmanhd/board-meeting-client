import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import { EventFocusComponent } from './event-focus/event-focus.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
=======
>>>>>>> 498e5f27eb01cb50e3a6a214b76a9269e4cf6c98

import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatCardModule, 
  MatMenuModule, 
  MatIconModule, 
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEventComponent } from './create-event/create-event.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    EventsComponent,
    ProfileComponent,
    EventFocusComponent,
    HomeComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
<<<<<<< HEAD
    MatDatepickerModule,
    MatNativeDateModule
    // NgbCarouselModule
=======
>>>>>>> 498e5f27eb01cb50e3a6a214b76a9269e4cf6c98
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
