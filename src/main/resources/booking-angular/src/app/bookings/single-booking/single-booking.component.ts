import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../services/dto/reservation";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogNoBookingsComponent} from "../bookings-list/dialog-no-bookings/dialog-no-bookings.component";
import {CancelBookingData, DialogCancelBookingComponent} from "./dialog-cancel-booking/dialog-cancel-booking.component";

@Component({
  selector: 'app-single-booking',
  templateUrl: './single-booking.component.html',
  styleUrls: ['./single-booking.component.scss']
})
export class SingleBookingComponent implements OnInit, OnDestroy {

  routeSub!: Subscription;
  reservation?: Reservation;
  id?: number


  constructor(private route: ActivatedRoute, private reservationService: ReservationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
        this.id = params['id'];
        this.retrieveReservation();
      }
    )
    this.retrieveReservation();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }

  retrieveReservation(): void {
    if (this.id != null) {
      this.reservationService.getReservation(this.id)
        .subscribe({
          next: (data) => {
            this.reservation = data;
          },
          error: (e) => console.error(e)
        });
    }
  }

  isEditBlocked() {
    return this.reservation?.status != "CURRENT"
  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(DialogCancelBookingComponent, {
      data: {
        id: this.reservation?.id,
        startDate: this.reservation?.startDate,
        endDate: this.reservation?.endDate,
        placeName: this.reservation?.accomodationPlaceName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
