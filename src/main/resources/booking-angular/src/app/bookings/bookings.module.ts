import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "../routing/app-routing.module";
import {BookingsComponent} from "./bookings.component";
import {BookingsListComponent} from './bookings-list/bookings-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {BookingsCardComponent} from './bookings-list/bookings-card/bookings-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {BookingsBannerComponent} from './bookings-banner/bookings-banner.component';
import {SingleBookingComponent} from './single-booking/single-booking.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from "@angular/material/button";
import {RankingStarComponent} from './single-booking/ranking-star/ranking-star.component';
import {SingleBookingInfoComponent} from './single-booking/single-booking-info/single-booking-info.component';
import {MatRippleModule} from "@angular/material/core";
import { DialogNoBookingsComponent } from './bookings-list/dialog-no-bookings/dialog-no-bookings.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import { DialogCancelBookingComponent } from './single-booking/dialog-cancel-booking/dialog-cancel-booking.component';
import {MatDividerModule} from "@angular/material/divider";
import { DialogEditBookingComponent } from './single-booking/dialog-edit-booking/dialog-edit-booking.component';


@NgModule({
  declarations: [
    BookingsComponent,
    BookingsListComponent,
    BookingsCardComponent,
    BookingsBannerComponent,
    SingleBookingComponent,
    RankingStarComponent,
    SingleBookingInfoComponent,
    DialogNoBookingsComponent,
    DialogCancelBookingComponent,
    DialogEditBookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    ScrollingModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    MatDatepickerModule,
    MatDividerModule,
  ],
  providers: [],

})
export class BookingsModule {
}
