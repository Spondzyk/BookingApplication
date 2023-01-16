import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "../routing/app-routing.module";
import {ChatComponent} from "./chat.component";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ChatComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
    ],
  providers: [],

})
export class ChatModule {
}
