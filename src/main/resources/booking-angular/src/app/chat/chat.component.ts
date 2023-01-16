import {Component, Injectable} from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(private http: HttpClient) {
  }

  login() {
    const headers = { 'Content-Type': 'application/json',"username": "orzel@gmail.com",
      "password": "pass"};

    this.http.post('http://localhost:8080/login' ,{}, {headers}).subscribe({
      next: (data) => {
      },
      error: (e) => console.error(e)
    });
  }
  logout() {
    this.http.get('http://localhost:8080/perform_logout')
  }
}
