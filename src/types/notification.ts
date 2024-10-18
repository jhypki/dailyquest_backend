import { User } from "./user";
import { NotificationType } from "../enums";

export interface Notification {
  id: string;
  user: User;
  userId: string;
  message: string;
  notificationType: NotificationType;
  isRead: boolean;
  createdAt: Date;
  notifyAt: Date;
}
