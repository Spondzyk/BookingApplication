import { Component, Input, Output, EventEmitter } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../services/dto/user";

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent {

  @Input() useText?: boolean;
  @Output() useTextChange = new EventEmitter<boolean>();
  user?: User;
  constructor(private router: Router, private userService: UserService) {
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

  save() : void{
    this.userService.updateAccountData(this.user!).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (e: HttpErrorResponse) => console.error(e)
    });
    window.location.reload()
  }

  cancel() {
    this.useText = !this.useText;
    this.useTextChange.emit(this.useText);
  }
}
