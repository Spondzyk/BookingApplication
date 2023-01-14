import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface CancelBookingData {
  id: number,
  startDate: Date,
  endDate: Date,
  placeName: string,
}


@Component({
  selector: 'app-dialog-cancel-booking',
  templateUrl: './dialog-cancel-booking.component.html',
  styleUrls: ['./dialog-cancel-booking.component.scss']
})
export class DialogCancelBookingComponent {
  constructor(public dialogRef: MatDialogRef<DialogCancelBookingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CancelBookingData,) {
  }

  clickNo(): void {
    this.dialogRef.close();
  }

  cancelBooking() {
    this.dialogRef.close();
  }
}
