import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from "../../../services/dto/reservation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, MyDateAdapter} from "./my-date-adapter";
import {ReservationService} from "../../../services/reservation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditBookingComponent} from "../dialog-edit-booking/dialog-edit-booking.component";
import {BaseComponent} from "../../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../../models/notification-message";

@Component({
  selector: 'app-single-booking-info',
  templateUrl: './single-booking-info.component.html',
  styleUrls: ['./single-booking-info.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class SingleBookingInfoComponent extends BaseComponent implements OnInit {
  @Input() reservation!: Reservation;
  isEdit = false;
  editable_data = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
    peopleNr: new FormControl<number | null>(null, [Validators.min(0), Validators.required]),
  });

  constructor(private reservationService: ReservationService, public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    if(this.reservation.accomodationPeople_nr)
      this.editable_data.controls.peopleNr.addValidators(Validators.max(this.reservation.accomodationPeople_nr))
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
    this.isEdit = false
    let data = structuredClone(this.reservation)
    if (this.editable_data.controls.start.value) {
      let d = new Date(this.editable_data.controls.start.value);
      d.setTime(d.getTime() - (d.getTimezoneOffset()*60*1000));
      data.startDate = d;
    }
    if (this.editable_data.controls.end.value) {
      let d: Date = new Date(this.editable_data.controls.end.value);
      d.setTime(d.getTime() - (d.getTimezoneOffset()*60*1000));
      data.endDate = d;
    }
    if (this.editable_data.controls.peopleNr.value) {
      data.people_nr = this.editable_data.controls.peopleNr.value;
    }
    this.editable_data.reset()

    this.reservationService.updateReservation(data).subscribe({
      next: (data) => {
        this.reservation = data;
        this.sendMessage("Booking parameters changed",NotificationMessageType.SUCCESS);
      },
      error: (e: HttpErrorResponse) => this.sendMessage(`Booking parameters are
incorrect due to:  ${e.error.detail}` ,NotificationMessageType.ERROR)
    });
  }

  editCancel() {
    this.isEdit = false;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day >= new Date();
  };

  openEditDialog() {
    const dialogRef = this.dialog.open(DialogEditBookingComponent, {
      data: {
        startDate: this.editable_data.controls.start.value,
        endDate: this.editable_data.controls.end.value,
        oldStartDate: this.reservation.startDate,
        oldEndDate: this.reservation.endDate,
        oldPeopleNr: this.reservation.people_nr,
        peopleNr: this.editable_data.controls.peopleNr.value,
        price: this.reservation.price,
        priceAccommodation: this.reservation.accomodationPrice,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
          this.saveEdit();
    });
  }
}
