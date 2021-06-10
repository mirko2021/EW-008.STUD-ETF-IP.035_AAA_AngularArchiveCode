import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations-service/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  public reservationsForm: FormGroup; 
  public formBuilder: FormBuilder; 
  public httpClient: HttpClient; 
  public reservationsService: ReservationsService; 
  public reservations : any[] = []; 

  public username: string = "";
  public password: string = "";   
  public old_reservation_id: string = ""; 
  public neo_reservation_id: string = ""; 
  public fly_id: string = ""; 
  public target_username: string = "";
  public article_description: string = "";
  public article_transport_spec_file: File| null = null;
  public place_count: number = -1; 

  constructor(formBuilder: FormBuilder, httpClient: HttpClient, reservationsService: ReservationsService) { 
    this.formBuilder = formBuilder;
    this.httpClient = httpClient; 
    this.reservationsService = reservationsService;
    this.reservationsForm = this.formBuilder.group({
      place_count: [Validators.required, Validators.min(-1)]
    });
  }

  ngOnInit(): void {
    this.list();
  }

  submitInsert(): void{
    var data = {
      username: this.username, 
      password: this.password,
      reservation_id : this.old_reservation_id, 
      fly_id: this.fly_id, 
      target_username: this.target_username, 
      article_description: this.article_description, 
      article_transport_spec_file: this.article_transport_spec_file, 
      place_count: this.place_count
    }
    this.reservationsService.insert(data);
  }

  submitErase(): void{
    var data = {
      username: this.username, 
      password: this.password,
      reservation_id : this.old_reservation_id, 
    }
    this.reservationsService.delete(data);
  }

  submitResetFile(): void{
    var data = {
      username: this.username, 
      password: this.password,
      reservation_id : this.old_reservation_id, 
    }
    this.reservationsService.resetFile(data);
  }

  submitUploadFile(): void{
    var data = {
      username: this.username, 
      password: this.password,
      reservation_id : this.old_reservation_id, 
    }
    this.reservationsService.uploadFile(data, this.article_transport_spec_file);
  }

  submitUpdate(): void{
    var data = {
      username: this.username, 
      password: this.password,
      reservation_id : this.old_reservation_id, 
      neo_reservation_id: this.neo_reservation_id,
      fly_id: this.fly_id, 
      target_username: this.target_username, 
      article_description: this.article_description, 
      article_transport_spec_file: this.article_transport_spec_file, 
      place_count: this.place_count
    }
    this.reservationsService.update(data);
  }

  handleFileInput(event: any): void {
    let fileInput = document.getElementById('article_transport_spec_file') as HTMLInputElement;
    var files = fileInput.files;
    if(files==null)
      this.article_transport_spec_file = null;
    else if(files.length==1)
      this.article_transport_spec_file = files.item(0);
    else
      this.article_transport_spec_file = null;
  }

  list(){
    this.httpClient.get('/reservations/list').subscribe(data => {
      var dJson = JSON.parse(JSON.stringify(data));
      this.reservations = dJson;
    });
  }

  toForm(reservation: any): void{
    var old_reservation_id   = document.getElementById('old_reservation_id') as HTMLInputElement;
    var fly_id = document.getElementById('fly_id') as HTMLInputElement;
    var target_username = document.getElementById('target_username') as HTMLInputElement;
    var article_description =  document.getElementById('article_description') as HTMLInputElement; 
    var place_count = document.getElementById('place_count') as HTMLInputElement;
    old_reservation_id.value = reservation.reservationId; 
    fly_id.value = reservation.flyId; 
    target_username.value = reservation.username;
    article_description.value = reservation.articleDescription; 
    place_count.value = reservation.placeCount;
    this.old_reservation_id = reservation.reservationId;
    this.fly_id = reservation.flyId; 
    this.target_username = reservation.username; 
    this.article_description = reservation.articleDescription;
    this.place_count = reservation.placeCount;
  }

  generateLink(reservation_id: string):string{
    return "/reservations/download_ast?reservation_id="+encodeURI(reservation_id);
  }
}
