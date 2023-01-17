import { Component } from '@angular/core';
import {BaseComponent} from "../core/abstract-base/base.component";
import {NotificationMessageType} from "../models/notification-message";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends BaseComponent{

  NotificationMessageType = NotificationMessageType;

  constructor() {
    super();
  }

}
