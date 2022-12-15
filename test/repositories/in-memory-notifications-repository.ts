import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) return null;

    return notification;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
  async save(notification: Notification): Promise<void> {
    const notificationIdx = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIdx >= 0)
      this.notifications[notificationIdx] = notification;
  }
}
