import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../services/dto/user";
import {BaseComponent} from "../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../models/notification-message";

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent extends BaseComponent {

  @Input() useText?: boolean;
  @Output() useTextChange = new EventEmitter<boolean>();
  user?: User;

  constructor(private router: Router, private userService: UserService) {
    super();
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

  save(): void {
    this.userService.updateAccountData(this.user!).subscribe({
      next: (data) => {
        console.log(data)
        this.sendMessage("Zapisano wyedytowane dane", NotificationMessageType.SUCCESS)
      },
      error: (e: HttpErrorResponse) => {
        console.error(e)
        this.sendMessage("Błąd zapisu danych", NotificationMessageType.ERROR)
      }
    });
    this.useText = !this.useText;
    this.useTextChange.emit(this.useText);
  }

  cancel() {
    this.useText = !this.useText;
    this.useTextChange.emit(this.useText);
    this.sendMessage("Anulowano edycję danych", NotificationMessageType.INFO)
  }
}
