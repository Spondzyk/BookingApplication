import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AcceptanceDialogComponent} from "../../core/acceptance-dialog/acceptance-dialog.component";

@Component({
  selector: 'app-single-place-display',
  templateUrl: './single-place-display.component.html',
  styleUrls: ['./single-place-display.component.scss']
})
export class SinglePlaceDisplayComponent {

  constructor(private router: Router, public dialog: MatDialog) {
  }

  return = () => {
    this.router.navigateByUrl('places');
  };

  deleteBtn() {
    const acceptanceDialog = this.dialog.open(AcceptanceDialogComponent);
    acceptanceDialog.afterClosed().subscribe((res) => {
      switch (res.event) {
        case "yes-option":
          console.log("usunieto")
          break;
        case "no-option":
          break;
        default:
          break;
      }
    });
  };

  editBtn = () => {
    this.router.navigateByUrl('places');
  };

}
