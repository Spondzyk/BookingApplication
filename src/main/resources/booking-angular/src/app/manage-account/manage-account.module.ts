import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {AppModule} from "../app.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ButtonsComponent } from './buttons/buttons.component';
import {FieldsComponent } from './fields/fields.component';
import {DialogDeleteAccount} from './buttons/dialog-delete-account/dialog-delete-account.component'
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AccountComponent,
    ButtonsComponent,
    FieldsComponent,
    DialogDeleteAccount,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    AppModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,


]
})
export class ManageAccountModule { }
