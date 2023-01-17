import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../services/dto/reservation";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogCancelBookingComponent} from "./dialog-cancel-booking/dialog-cancel-booking.component";
import {BaseComponent} from "../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../models/notification-message";

@Component({
  selector: 'app-single-booking',
  templateUrl: './single-booking.component.html',
  styleUrls: ['./single-booking.component.scss']
})
export class SingleBookingComponent extends BaseComponent implements OnInit, OnDestroy {

  routeSub!: Subscription;
  reservation?: Reservation;
  id?: number


  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService, public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.routeSub = this.route.data.subscribe(({reservation}) => {
        this.reservation = reservation;
      }
    )
  }

  override ngOnDestroy() {
    this.routeSub.unsubscribe();
    super.ngOnDestroy();
  }

  retrieveReservation(): void {
    if (this.id != null) {
      this.reservationService.getReservation(this.id)
        .subscribe({
          next: (data) => {
            this.reservation = data;
          },
          error: (e) => this.router.navigate(['/bookings'])
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

    dialogRef.afterClosed().subscribe(id => {
      this.reservationService.cancelReservation(id).subscribe({
        next: (data) => {
          this.reservation = data;
          this.sendMessage("Booking cnaceled succesfully", NotificationMessageType.SUCCESS);
        },
        error: (e) => console.error(e)
      });
    });
  }
}
