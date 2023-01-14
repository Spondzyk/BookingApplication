import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "../main-page/main-page.component";
import {PlaceListComponent} from "../manage-places/place-list/place-list.component";
import {NewPlaceComponent} from "../manage-places/new-place/new-place.component";
import {SinglePlaceDisplayComponent} from "../manage-places/single-place-display/single-place-display.component";
import {ChatComponent} from "../chat/chat.component";
import {BookingsModule} from "../bookings/bookings.module";
import {BookingsComponent} from "../bookings/bookings.component";
import {BookingsBannerComponent} from "../bookings/bookings-banner/bookings-banner.component";
import {SingleBookingComponent} from "../bookings/single-booking/single-booking.component";
import {AccountComponent} from "../manage-account/account/account.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'places', component: PlaceListComponent},
  {path: 'places/add', component: NewPlaceComponent},
  {path: 'places/:id', component: SinglePlaceDisplayComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'bookings', component: BookingsComponent, children: [
      { path: '', component: BookingsBannerComponent },
      { path: ':id', component: SingleBookingComponent },
    ]},
  {path: 'account', component: AccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
