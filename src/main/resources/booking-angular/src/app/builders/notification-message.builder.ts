import {DeepPartial} from "../types/deep-partial";
import {mergeDeep} from "../utils/type-util";
import {NotificationMessage, NotificationMessageType} from "../models/notification-message";


export function buildNotificationMessage(override?: DeepPartial<NotificationMessage>): NotificationMessage {
  const defaults: NotificationMessage = {
    message: "test",
    type: NotificationMessageType.INFO
  };
  return mergeDeep(defaults, override) as NotificationMessage;
}
