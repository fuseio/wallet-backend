import { Injectable } from '@nestjs/common';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import { User } from 'lib/common/src';
import FirebaseService from 'lib/common/src/services/firebase.service';
import { IMessage } from '../messages/imessage.interface';

@Injectable()
export class NotificationsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async sendNotification(user: User, message: IMessage) {
    try {
      if (!user.fcmTokens.length) {
        console.warn(`Couldn't find fcmTokens for user with id: ${user._id}`);
        return null;
      }

      const multicastMessage = this.createMulticastMessage(
        message,
        user.fcmTokens,
      );

      this.firebaseService.sendMessage(multicastMessage);
    } catch (e) {
      console.log(e);
    }
  }

  private createMulticastMessage(message: IMessage, fcmTokens: string[]) {
    const defaultData = {
      messageType: message.getType(),
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
    };

    const messageData = message.getData();
    const data = { ...messageData, ...defaultData };

    const multicastMessage: MulticastMessage = {
      notification: message.getNotification(),
      data: data,
      tokens: fcmTokens,
    };

    return multicastMessage;
  }
}
