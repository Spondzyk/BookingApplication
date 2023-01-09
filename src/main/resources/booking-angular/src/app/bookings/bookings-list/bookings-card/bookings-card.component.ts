import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from "../../../services/dto/reservation";

@Component({
  selector: 'app-bookings-card',
  templateUrl: './bookings-card.component.html',
  styleUrls: ['./bookings-card.component.scss']
})
export class BookingsCardComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;

  @Input() reservation!: Reservation;

  ngOnInit(): void {
  }

}
