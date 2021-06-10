import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { FlightComponent } from './flight/flight.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlightService } from './flight-service/flight.service';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    FlightComponent,
    ReservationsComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
