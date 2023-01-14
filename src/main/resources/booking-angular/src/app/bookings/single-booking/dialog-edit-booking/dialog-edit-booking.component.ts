import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface EditBookingData {
  startDate: Date,
  endDate: Date,
  oldStartDate: Date,
  oldEndDate: Date,
  oldPeopleNr: number,
  peopleNr: number,
  price: number,
  priceAccommodation: number
}
@Component({
  selector: 'app-dialog-edit-booking',
  templateUrl: './dialog-edit-booking.component.html',
  styleUrls: ['./dialog-edit-booking.component.scss']
})
export class DialogEditBookingComponent {
  newPrice: number;
  constructor(public dialogRef: MatDialogRef<DialogEditBookingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditBookingData,) {
    this.newPrice = this.calculatePrice();
  }

  clickNo(): void {
    this.dialogRef.close();
  }

  calculatePrice(){
      let d1 = new Date(this.data.startDate).getTime();
      let d2 = new Date(this.data.endDate).getTime();

      let Difference_In_Time = d2 - d1;
      let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      return this.data.priceAccommodation * Difference_In_Days;
  }
}
