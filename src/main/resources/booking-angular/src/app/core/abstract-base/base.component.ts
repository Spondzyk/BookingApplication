import {Component, inject, OnDestroy} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Observable, Subject} from "rxjs";
import {NotificationMessage, NotificationMessageType} from "../../models/notification-message";

@Component({
  template: ''
})
export class BaseComponent implements OnDestroy {

  public service: MessageService = inject(MessageService);
  protected destroyed$ = new Subject<boolean>()

  constructor() {
  }

  sendMessage(message: string, type: NotificationMessageType): void {
    this.service.sendMessage(message, type);
  }

  clearMessage(): void {
    this.service.clearMessage();
  }

  getMessage(): Observable<NotificationMessage> {
    return this.service.getMessage();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
