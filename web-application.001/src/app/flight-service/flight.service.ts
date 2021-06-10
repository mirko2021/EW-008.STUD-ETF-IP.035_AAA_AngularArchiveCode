import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  public httpClient: HttpClient; 
  constructor(httpClient: HttpClient) {
      this.httpClient = httpClient; 
   }

  insert(insert_data: any){
    this.httpClient.post<any>('/flights/put', JSON.stringify(insert_data)).subscribe(data => {
      if(data.success) alert('Подаци о лету су успјешно адаптриани или постављени.');
      else alert('Подаци о лету нису успјешно адаптриани или постављени.');
      window.location.reload();
    });
  }
  update(update_data: any){
    this.httpClient.post<any>('/flights/update', JSON.stringify(update_data)).subscribe(data => {
      if(data.success) alert('Подаци о лету су успјешно измјењени.');
      else alert('Подаци о лету нису успјешно измјењени.');
      window.location.reload();
    });
  }
  delete(delete_data: any){
    this.httpClient.post<any>('/flights/delete', JSON.stringify(delete_data)).subscribe(data => {
      if(data.success) alert('Подаци о лету су успјешно избрисани.');
      else alert('Подаци о лету нису успјешно избрисани.');
      window.location.reload();
    });
  }
}
