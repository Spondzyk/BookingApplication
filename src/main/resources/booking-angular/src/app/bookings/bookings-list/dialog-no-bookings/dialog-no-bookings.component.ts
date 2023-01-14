import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-no-bookings',
  templateUrl: './dialog-no-bookings.component.html',
  styleUrls: ['./dialog-no-bookings.component.scss']
})
export class DialogNoBookingsComponent {
  constructor(private router: Router, public dialogRef: MatDialogRef<DialogNoBookingsComponent>) {
  }

  goToHome(): void {
    this.router.navigateByUrl(``)
    this.dialogRef.close();
  }
}
