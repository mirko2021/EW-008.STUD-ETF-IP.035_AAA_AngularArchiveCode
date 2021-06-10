import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight-service/flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  public flightForm: FormGroup; 
  public formBuilder: FormBuilder; 
  public httpClient: HttpClient; 

  public oldFlyId : string = ""; 
  public neoFlyId : string = ""; 
  public flyDate : string = ""; 
  public username : string = ""; 
  public password : string = ""; 
  public relation : string = ""; 
  public flightSerivce: FlightService; 
  public flights : any[] = []; 

  constructor(formBuilder: FormBuilder, httpClient: HttpClient, flightSerivce: FlightService) { 
    this.formBuilder = formBuilder;
    this.httpClient = httpClient; 
    this.flightSerivce = flightSerivce;
    this.flightForm = this.formBuilder.group({
      old_fly_id: ['', Validators.required], 
      neo_fly_id: ['', Validators.required], 
      fly_date:   ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.flightForm = this.formBuilder.group({
      old_fly_id: ['', Validators.required], 
      neo_fly_id: ['', Validators.required], 
      fly_date:   ['', Validators.required]
    });
    this.list();
  }

  submitInsert(){
      var data = {
        username: this.username, 
        password: this.password,
        fly_id: this.oldFlyId, 
        fly_date: this.flyDate, 
        relation: this.relation
      }
      this.flightSerivce.insert(data);
  }

  submitErase(){
    var data = {
      username: this.username, 
      password: this.password,
      fly_id: this.oldFlyId
    }
    this.flightSerivce.delete(data);
    this.password = '';
  }

  submitUpdate(){
    var data = {
      username: this.username,
      password: this.password, 
      old_fly_id: this.oldFlyId,   
      neo_fly_id: this.neoFlyId, 
      fly_date : this.flyDate, 
      relation : this.relation
    }
    this.flightSerivce.update(data);
    this.password = '';
  }

  list(){
    this.httpClient.get('/flights/list').subscribe(data => {
      var dJson = JSON.parse(JSON.stringify(data));
      this.flights = dJson;
    });
  }

  toForm(flight: any): void{
    var fly_id   = document.getElementById('old_fly_id') as HTMLInputElement;
    var fly_date = document.getElementById('fly_date') as HTMLInputElement;
    var relation = document.getElementById('relation') as HTMLInputElement;
    fly_id.value = flight.flightId;
    fly_date.value= flight.flightDate;
    relation.value = flight.relation;
    this.oldFlyId = flight.flightId; 
    this.flyDate = flight.flightDate; 
    this.relation = flight.relation;
  }
}
