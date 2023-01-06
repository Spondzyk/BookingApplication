import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "../routing/app-routing.module";
import {BookingsComponent} from "./bookings.component";
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { BookingsCardComponent } from './bookings-list/bookings-card/bookings-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import { BookingsBannerComponent } from './bookings-banner/bookings-banner.component';
import { SingleBookingComponent } from './single-booking/single-booking.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from "@angular/material/button";
import { RankingStarComponent } from './single-booking/ranking-star/ranking-star.component';
import { SingleBookingInfoComponent } from './single-booking/single-booking-info/single-booking-info.component';



@NgModule({
  declarations: [
    BookingsComponent,
    BookingsListComponent,
    BookingsCardComponent,
    BookingsBannerComponent,
    SingleBookingComponent,
    RankingStarComponent,
    SingleBookingInfoComponent,
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
  ],
  providers: [],

})
export class BookingsModule {
}
