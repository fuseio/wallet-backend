import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { notificationsServiceName } from '../../constants/services';
import { TokenTransferWebhookDto } from '../../dtos/notifications/token-transfer-webhook.dto';
import { BaseClientProxy } from '../base-client-proxy';

@Injectable()
export class NotificationClientProxy extends BaseClientProxy {
  constructor(
    @Inject(notificationsServiceName)
    clientProxy: ClientProxy,
  ) {
    super(clientProxy);
  }

  tokenTransfersWebhook(tokenTransferWebhookDto: TokenTransferWebhookDto) {
    return this.send('token_transfers_webhook', tokenTransferWebhookDto);
  }

  subscribeTokenTransfers(data: { walletAddress: string }) {
    return this.send('subscribe_token_transfers', data);
  }

  unsubscribeTokenTransfers(data: { walletAddress: string }) {
    return this.send('unsubscribe_token_transfers', data);
  }
}
