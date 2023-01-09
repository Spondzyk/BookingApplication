import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../services/dto/reservation";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-single-booking',
  templateUrl: './single-booking.component.html',
  styleUrls: ['./single-booking.component.scss']
})
export class SingleBookingComponent implements OnInit, OnDestroy {

  routeSub!: Subscription;
  reservation?: Reservation;
  id?: number


  constructor(private route: ActivatedRoute, private reservationService: ReservationService) {
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
}
