import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {

  constructor() { }

  notifications: any[];
  selectedNotification: any;

  ngOnInit() {
    this.notifications = [
      {
        "id": 1,
        "name": "Laura ha inviato una notifica",
        "email": "lbutler0@latimes.com",
        "age": 47
      },
      {
        "id": 2,
        "name": "Walter ha inviato una notifica",
        "email": "wkelley1@goodreads.com",
        "age": 37
      },
      {
        "id": 3,
        "name": "Walter ha inviato una notifica",
        "email": "wgutierrez2@smugmug.com",
        "age": 49
      },
      {
        "id": 4,
        "name": "Jesse ha inviato una notifica",
        "email": "jarnold3@com.com",
        "age": 47
      },
      {
        "id": 5,
        "name": "Irene ha inviato una notifica",
        "email": "iduncan4@oakley.com",
        "age": 33
      }
    ];
  }

}
