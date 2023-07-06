import { Injectable } from '@nestjs/common';
import { NotificationClientProxy } from 'lib/common/src/client-proxies';
import { TokenTransferWebhookDto } from 'lib/common/src/dtos';

@Injectable()
export class NotificationsApiService {
  constructor(
    private readonly notificationClientProxy: NotificationClientProxy,
  ) {}

  tokenTransfersWebhook(tokenTransferWebhookDto: TokenTransferWebhookDto) {
    return this.notificationClientProxy.tokenTransfersWebhook(
      tokenTransferWebhookDto,
    );
  }
}
