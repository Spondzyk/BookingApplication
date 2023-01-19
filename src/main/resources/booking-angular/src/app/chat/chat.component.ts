import {Component, Injectable} from '@angular/core';
import * as http from "http";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {NotificationMessageType} from "../models/notification-message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(private router: Router, private userService: UserService) {
  }

  deleteAccount() {
    this.userService.deleteAccount().subscribe({
      next: (data) => {
        console.log(data)
        this.logout();
      },
      error: (e: HttpErrorResponse) => console.error(e)
    });
  };

  logout() {
    this.userService.logout().subscribe({
      next: (data) => {
        window.location.reload();
        this.router.navigateByUrl('');
      },
      error: (e: HttpErrorResponse) => {
        window.location.reload();
        this.router.navigateByUrl('');
      }
    });
  }
}
