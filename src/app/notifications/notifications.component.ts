import { Component, OnInit } from '@angular/core';
import { WebSocketAPI} from './WebSocketAPI'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent{

  constructor() { }
   webSocketAPI:WebSocketAPI;
  greeting: any;
  name: string;
  notifications: Array<any> = [];
  
  ngOnInit(){
    try {
      this.webSocketAPI = new WebSocketAPI(this);
    } catch (e) {
      console.warn("Failed to initialize WebSocket API:", e.message);
    }
  }
  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
    try {
      const payload = typeof message === 'string' ? { message } : message;
      const entry = {
        title: payload.title || 'Notification',
        body: payload.body || payload.message || JSON.stringify(payload),
        time: new Date()
      };
      this.notifications.unshift(entry);
      // keep only the latest 50
      if (this.notifications.length > 50) { this.notifications.length = 50; }
    } catch (e) {
      console.warn('Failed to add notification', e);
    }
  }

}
