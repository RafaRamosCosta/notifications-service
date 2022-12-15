import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count the notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient1',
    });

    expect(count).toEqual(2);
  });
});
