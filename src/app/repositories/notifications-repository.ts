import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notifaction: Notification): Promise<void>;

  abstract findById(notifactionId: string): Promise<Notification | null>;

  abstract save(notifaction: Notification): Promise<void>;

  abstract countManyByRecipientId(recipientId: string): Promise<number>;

  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}
