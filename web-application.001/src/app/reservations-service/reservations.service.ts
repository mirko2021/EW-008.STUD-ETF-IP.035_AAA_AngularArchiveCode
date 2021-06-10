import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  public httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient; 
  }

  public insert(data: any): void{
    this.httpClient.post<any>('/reservations/put', JSON.stringify(data)).subscribe(data => {
      if(data.success) alert('Подаци о резервацији су успјешно адаптриани или постављени.');
      else alert('Подаци о резервацији нису успјешно адаптриани или постављени.');
      window.location.reload();
    });
  }

  public update(data: any): void{
    this.httpClient.post<any>('/reservations/update', JSON.stringify(data)).subscribe(data => {
      if(data.success) alert('Подаци о резервацији су успјешно измјењени.');
      else alert('Подаци о резервацији нису успјешно измјењени.');
      window.location.reload();
    });
  }

  public delete(data: any): void{
    this.httpClient.post<any>('/reservations/delete', JSON.stringify(data)).subscribe(data => {
      if(data.success) alert('Подаци о резервацији су успјешно избрисани.');
      else alert('Подаци о резервацији нису успјешно избрисани.');
      window.location.reload();
    });
  }

  public resetFile(data: any): void{
    this.httpClient.post<any>('/reservations/reset_ast', JSON.stringify(data)).subscribe(data => {
      if(data.success) alert('Датотека спецификације превоза робе је успјешно избрисана.');
      else alert('Датотека спецификације превоза робе није успјешно избрисана.');
      window.location.reload();
    });
  }

  public uploadFile(data: any, article_transport_spec_file: File| null): void{
    if(article_transport_spec_file===null) {alert('Датотека спецификације превоза робе није подигнута на сервер.');return; }
    const formData: FormData = new FormData();
    formData.append('file', article_transport_spec_file as File);
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('reservation_id', data.reservation_id);
    formData.append('file_name', article_transport_spec_file.name);

    this.httpClient.post<any>('/reservations/upload_ast', formData).subscribe(data => {
      if(data.success) alert('Датотека спецификације превоза робе је успјешно подигнута на сервер.');
      else alert('Датотека спецификације превоза робе није подигнута на сервер.');
      window.location.reload();
    });
    
    /*
      const req = new HttpRequest<FormData>('POST', '/reservations/upload_ast', formData, {
        reportProgress: true,
        responseType: 'json'
      });

      this.httpClient.request(req).subscribe(data => {
        alert('Датотека спецификације превоза робе је успјешно подигнута на сервер.');
        window.location.reload();
      });
    */
  }
}
