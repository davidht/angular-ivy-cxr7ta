import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkDashDevService {
  app: AppComponent = null;
  messages: string[] = [];

  constructor() {}

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  linkApp(app: AppComponent) {
    this.app = app;
  }
}
