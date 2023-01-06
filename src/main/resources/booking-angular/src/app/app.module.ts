import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageComponent} from './main-page/main-page.component';
import {GeneralLayoutComponent} from './core/general-layout/general-layout.component';
import {MatIconModule} from "@angular/material/icon";
import {GeneralLayoutModule} from "./core/general-layout/general-layout.module";
import {PlaceListComponent} from './manage-places/place-list/place-list.component';
import {NewPlaceComponent} from './manage-places/new-place/new-place.component';
import {SinglePlaceDisplayComponent} from './manage-places/single-place-display/single-place-display.component';
import {AcceptanceDialogComponent} from './core/acceptance-dialog/acceptance-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {ChatModule} from "./chat/chat.module";
import {BookingsModule} from "./bookings/bookings.module";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GeneralLayoutComponent,
    PlaceListComponent,
    NewPlaceComponent,
    SinglePlaceDisplayComponent,
    AcceptanceDialogComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GeneralLayoutModule,
    MatDialogModule,
    HttpClientModule,
    ChatModule,
    BookingsModule,
  ],
  exports: [
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
