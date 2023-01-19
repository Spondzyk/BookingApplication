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
import {SinglePlaceCardComponent} from './manage-places/place-list/single-place-card/single-place-card.component';
import {PlaceAddressPipe} from "./manage-places/pipes/place-address.pipe";
import {MatCardModule} from '@angular/material/card';
import {ImageGalleryComponent} from './manage-places/single-place-display/image-gallery/image-gallery.component';
import {ScrollViewModule} from '@progress/kendo-angular-scrollview';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {ManageAccountModule} from "./manage-account/manage-account.module";
import {BaseComponent} from "./core/abstract-base/base.component";
import {NotificationMessageComponent} from './core/notification-message/notification-message.component';
import {AlertTypeIconPipe} from "./core/notification-message/pipes/alert-type-icon.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GeneralLayoutComponent,
    PlaceListComponent,
    NewPlaceComponent,
    SinglePlaceDisplayComponent,
    AcceptanceDialogComponent,
    SinglePlaceCardComponent,
    PlaceAddressPipe,
    ImageGalleryComponent,
    FileUploadComponent,
    BaseComponent,
    NotificationMessageComponent,
    AlertTypeIconPipe
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GeneralLayoutModule,
    MatDialogModule,
    HttpClientModule,
    ChatModule,
    BookingsModule,
    ScrollViewModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    ManageAccountModule
  ],
    exports: [
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        ImageGalleryComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
