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
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

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
  MatNativeDateModule,
  MatSidenavModule,
  MatDialogModule,
  MatExpansionModule,
  MatTableModule
} from '@angular/material';

import { 
  FormsModule, 
  ReactiveFormsModule
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEventComponent } from './create-event/create-event.component';
import { getToken } from '@angular/router/src/utils/preactivation';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    EventsComponent,
    ProfileComponent,
    EventFocusComponent,
    HomeComponent,
    CreateEventComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    JwtModule,

  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
