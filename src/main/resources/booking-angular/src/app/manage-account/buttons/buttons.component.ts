import {Component} from "@angular/core";
import {
  DialogDeleteAccount
} from "./dialog-delete-account/dialog-delete-account.component";

import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  constructor( public dialog: MatDialog, private router: Router, private userService: UserService) {
  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(DialogDeleteAccount, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
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
