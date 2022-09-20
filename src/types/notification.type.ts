import { NotificationType } from "./notification.enum";

export type NotificationDataConfig = {
    message: string,
    type: NotificationType;
}

export type NotificationConfig = {
    duration: number,
    verticalPosition:  'top' | 'bottom',
    horizontalPosition: 'left' | 'right',
    data: NotificationDataConfig;
  };