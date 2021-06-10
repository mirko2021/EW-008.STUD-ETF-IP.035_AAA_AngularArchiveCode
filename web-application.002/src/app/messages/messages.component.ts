import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public httpClient: HttpClient;
  public read_messages : any[] = []; 
  public non_read_messages : any[] = [];
  public username: string = ""; 
  public password: string = ""; 

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  
  ngOnInit(): void { 
    this.list_read_messages(); 
    this.list_non_read_messages(); 
  }
  
  list_read_messages(): void{
    this.httpClient.get('/messages/list/read').subscribe(data => {
      var dJson = JSON.parse(JSON.stringify(data));
      this.read_messages = dJson;
    });
  }
 
  list_non_read_messages(): void{
    this.httpClient.get('/messages/list/non_read').subscribe(data => {
      var dJson = JSON.parse(JSON.stringify(data));
      this.non_read_messages = dJson;
    });
  }

  sentRead(messageId: string): void{
    var data = {
      message_id: messageId, 
      username: this.username, 
      password: this.password
    }

    this.httpClient.post('/messages/mark_read', data).subscribe(data => {
      var dJson = JSON.parse(JSON.stringify(data));
      if(dJson.success)
        alert('Порука је успјешно прочитана.');
      else
        alert('Порука није успјешно прочитана.');
      window.location.reload();
    });
  }
}