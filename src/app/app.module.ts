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
// import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatCardModule, 
  MatMenuModule, 
  MatIconModule, 
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';

import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    EventsComponent,
    ProfileComponent,
    EventFocusComponent,
    HomeComponent
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
    // NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
