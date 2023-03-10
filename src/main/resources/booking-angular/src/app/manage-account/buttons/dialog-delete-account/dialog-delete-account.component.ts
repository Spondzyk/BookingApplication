import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {BaseComponent} from "../../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../../models/notification-message";

export interface CancelBookingData {
  id: number,
  startDate: Date,
  endDate: Date,
  placeName: string,
}


@Component({
  selector: 'app-dialog-delate-account',
  templateUrl: './dialog-delete-account.html',
  styleUrls: ['./dialog-delete-account.component.scss']
})
export class DialogDeleteAccount extends BaseComponent {
  constructor(public dialogRef: MatDialogRef<DialogDeleteAccount>,
              @Inject(MAT_DIALOG_DATA) public data: CancelBookingData,private router: Router, private userService: UserService) {
    super();
  }

  clickNo(): void {
    this.dialogRef.close();
    this.sendMessage("Anulowano usuwanie konta", NotificationMessageType.INFO)
  }

  clickYes() {
    this.deleteAccount()
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
