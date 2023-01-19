import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NotificationMessage, NotificationMessageType} from "../models/notification-message";
import {buildNotificationMessage} from "../builders/notification-message.builder";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public subject = new Subject<NotificationMessage>();

  sendMessage(message: string, type: NotificationMessageType): void {
    this.subject.next(buildNotificationMessage({message, type}));
  }

  clearMessage(): void {
    this.subject.next(buildNotificationMessage());
  }

  getMessage(): Observable<NotificationMessage> {
    return this.subject.asObservable();
  }
}
