import {Component} from '@angular/core';
import {takeUntil} from "rxjs";
import {BaseComponent} from "../abstract-base/base.component";
import {NotificationMessage, NotificationMessageType} from "../../models/notification-message";

@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent extends BaseComponent {

  public alerts: NotificationMessage[] = [];
  public NotificationMessageType = NotificationMessageType;
  private TIMEOUT = 10000; //time in milliseconds
  private MAX_NUMBER_OF_NOTIFICATION = 3;

  constructor() {
    super();
    this.service.getMessage().pipe(takeUntil(this.destroyed$)).subscribe(alert => {
      if (this.alerts.length < this.MAX_NUMBER_OF_NOTIFICATION){
        this.alerts.push(alert);
        this.alerts.reverse();
      }
      else {
        this.alerts.pop();
        this.alerts.reverse();
        this.alerts.push(alert);
        this.alerts.reverse();
      }
      setTimeout(() => this.removeAlert(alert), this.TIMEOUT);
    });
  }

  removeAlert(alert: NotificationMessage): void {
    this.alerts = this.alerts.filter(listAlertInstance => listAlertInstance !== alert);
  }
}
