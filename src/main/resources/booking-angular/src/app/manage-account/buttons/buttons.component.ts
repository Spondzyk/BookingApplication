import {Component} from "@angular/core";
import {
  DialogDeleteAccount
} from "./dialog-delete-account/dialog-delete-account.component";

import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  constructor( public dialog: MatDialog) {
  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(DialogDeleteAccount, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
