import {Component, Input} from '@angular/core';
import {Reservation} from "../../../services/dto/reservation";

@Component({
  selector: 'app-single-booking-info',
  templateUrl: './single-booking-info.component.html',
  styleUrls: ['./single-booking-info.component.scss']
})
export class SingleBookingInfoComponent {
  @Input() reservation!: Reservation;

}
