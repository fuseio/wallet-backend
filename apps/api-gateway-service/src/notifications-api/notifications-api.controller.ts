import { Body, Controller, Post } from '@nestjs/common';
import { TokenTransferWebhookDto } from 'lib/common/src/dtos';
import { NotificationsApiService } from './notifications-api.service';

@Controller('/notifications')
export class NotificationsApiController {
  constructor(
    private readonly notificationApiService: NotificationsApiService,
  ) {}

  @Post('/webhooks/token-transfers')
  async webhookTokenTransfers(
    @Body() tokenTransferWebhookDto: TokenTransferWebhookDto,
  ) {
    await this.notificationApiService.tokenTransfersWebhook(
      tokenTransferWebhookDto,
    );

    return { data: 'ok' };
  }
}
