import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {Reservation} from "../../services/dto/reservation";
import {MatDialog} from "@angular/material/dialog";
import {ReservationService} from "../../services/reservation.service";
import {DialogNoBookingsComponent} from "./dialog-no-bookings/dialog-no-bookings.component";

interface Option {
  value: string;
  viewValue: string;
}

class Observable<T> {
}

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit{
  options: Option[] = [
    {value: '', viewValue: 'ALL'},
    {value: 'current', viewValue: 'CURRENT'},
    {value: 'past', viewValue: 'PAST'},
    {value: 'canceled', viewValue: 'CANCELED'},
  ];
  optionControl: FormControl = new FormControl<Option>(this.options[0]);
  filteredReservations?: Reservation[];


  constructor(private router: Router, private reservationService: ReservationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.optionControl.setValue(this.options[0].value);
    this.retrieveReservationsInfo();
  }

  reservations?: Reservation[];

  retrieveReservationsInfo(): void {
    this.reservationService.getAll()
      .subscribe({
        next: (data) => {
          this.reservations = data;
          this.filterReservation();
        },
        error: (e) => console.error(e)
      });
  }

  goToReservation(id: number) {
    this.router.navigate(['/bookings', id]);
  }

  filterReservation() {
    if(this.reservations?.length === 0){
      this.openDialog()
    }
    this.filteredReservations =
      this.reservations?.filter(res =>
        res.status.toLowerCase().match(this.optionControl.value));
  }
  openDialog() {
    this.dialog.open(DialogNoBookingsComponent);
  }
}
