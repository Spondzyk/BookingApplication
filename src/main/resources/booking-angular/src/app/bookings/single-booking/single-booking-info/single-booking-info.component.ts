import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from "../../../services/dto/reservation";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, MyDateAdapter} from "./my-date-adapter";

@Component({
  selector: 'app-single-booking-info',
  templateUrl: './single-booking-info.component.html',
  styleUrls: ['./single-booking-info.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class SingleBookingInfoComponent implements OnInit {
  @Input() reservation!: Reservation;
  isEdit = false;
  editable_data = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
    peopleNr: new FormControl<number | null>(null, [Validators.min(0), Validators.required]),
  });

  ngOnInit(): void {
  }

  isEditBlocked() {
    return this.reservation?.status != "CURRENT";
  }

  colorStatus() {
    return this.reservation.status == "PAST" ? "grey" : "red";
  }
  colorStatusPayment() {
    return this.reservation.paymentStatus == "UNPAID" ? "red" : "black";

  }

  editEnable() {
    this.isEdit = true;
    this.editable_data.patchValue({
      start: this.reservation.startDate,
      end: this.reservation.endDate,
      peopleNr: this.reservation.people_nr,
    })
  }

  saveEdit() {
    console.log("Edit saved")
  }

  editCancel() {
    this.isEdit = false;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day >= new Date();
  };
}
