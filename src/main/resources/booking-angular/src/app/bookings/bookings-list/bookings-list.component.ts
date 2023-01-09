import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../services/dto/reservation";
import {filter, map, startWith} from "rxjs";

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
export class BookingsListComponent implements OnInit {
  options: Option[] = [
    {value: '', viewValue: 'ALL'},
    {value: 'current', viewValue: 'CURRENT'},
    {value: 'past', viewValue: 'PAST'},
    {value: 'canceled', viewValue: 'CANCELED'},
  ];
  optionControl: FormControl = new FormControl<Option>(this.options[0]);
  filteredReservations?: Reservation[];


  constructor(private router: Router, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.optionControl.setValue(this.options[0].value);
    this.retrievePlaces();
  }

  reservations?: Reservation[];

  retrievePlaces(): void {
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
    this.router.navigateByUrl(`bookings/${id}`)
  }

  filterReservation() {
    this.filteredReservations =
      this.reservations?.filter(res =>
        res.status.toLowerCase().match(this.optionControl.value));
    console.log(this.filteredReservations)
    console.log(this.optionControl.value)
  }
}
