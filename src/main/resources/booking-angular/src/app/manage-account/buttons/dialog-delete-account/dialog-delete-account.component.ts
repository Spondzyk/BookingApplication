import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
export class DialogDeleteAccount {
  constructor(public dialogRef: MatDialogRef<DialogDeleteAccount>,
              @Inject(MAT_DIALOG_DATA) public data: CancelBookingData,) {
  }

  clickNo(): void {
    this.dialogRef.close();
  }

  deleteAccount() {
    this.dialogRef.close();
  }
}
