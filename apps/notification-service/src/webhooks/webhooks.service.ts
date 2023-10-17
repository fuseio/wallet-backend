import { Injectable } from '@nestjs/common';
import { TokenTransferWebhookDto, User } from 'lib/common/src';
import { UserClientProxy } from 'lib/common/src/client-proxies';
import { IMessage } from '../common/messages/imessage.interface';
import { TokenTransferMessageFactory } from '../common/messages/token-transfers/token-transfer-message.factory';
import { NotificationsService } from '../common/services/notifications.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhooksService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService,
    private readonly userClient: UserClientProxy,
  ) {}

  async handleTokenTransfer(tokenTransferWebhookDto: TokenTransferWebhookDto) {
    const notificationMessage = TokenTransferMessageFactory.create(
      tokenTransferWebhookDto,
    );

    const user = await this.userClient.findUserBy({
      walletAddress: tokenTransferWebhookDto.to,
    });

    if (!user) {
      console.warn(
        `Couldn't find user with walletAddress: ${tokenTransferWebhookDto.to}`,
      );
      return null;
    }

    this.sendNotification(user, notificationMessage);
  }

  private sendNotification(user: User, message: IMessage) {
    this.notificationsService.sendNotification(user, message);
  }
}
