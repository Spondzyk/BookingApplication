import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-acceptance-dialog',
  templateUrl: './acceptance-dialog.component.html',
  styleUrls: ['./acceptance-dialog.component.scss']
})
export class AcceptanceDialogComponent {

  constructor(public dialogRef: MatDialogRef<AcceptanceDialogComponent>) {
  }

  yesDialog() {
    this.dialogRef.close({event: 'yes-option'});
  }

  noDialog() {
    this.dialogRef.close({event: 'no-option'});
  }
}
