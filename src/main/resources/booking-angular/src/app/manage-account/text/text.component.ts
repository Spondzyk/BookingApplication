import { Component, Input, Output, EventEmitter } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../services/dto/user";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Input() useText?: boolean;
  @Output() useTextChange = new EventEmitter<boolean>();


  user?: User;
  constructor(private router: Router, private userService: UserService) {
    this.retrieveLoggedUser();
  }

  ngOnInit(): void {
    this.retrieveLoggedUser();
  }
  retrieveLoggedUser(): void {
    this.userService.getAccountDate()
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.log(e)
      });
  }


  edit() {
  this.useText = !this.useText;
  this.useTextChange.emit(this.useText);

  }
}
