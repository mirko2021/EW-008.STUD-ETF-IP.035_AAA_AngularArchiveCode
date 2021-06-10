import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { IndexComponent } from './index/index.component';
import { MessagesComponent } from './messages/messages.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  {
    path: 'ui_messages', 
    component: MessagesComponent
  }, 
  {
    path: 'ui_flights', 
    component: FlightComponent
  },
  {
    path: 'ui_reservations', 
    component: ReservationsComponent
  }, 
  {
    path: 'index.html', 
    component: IndexComponent
  }, 
  {
    path: '', 
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }