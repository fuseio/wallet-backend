import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenTransferWebhookDto } from 'lib/common/src/dtos/notifications/token-transfer-webhook.dto';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @MessagePattern('token_transfers_webhook')
  tokenTransfers(tokenTransferWebhookDto: TokenTransferWebhookDto) {
    return this.webhooksService.handleTokenTransfer(tokenTransferWebhookDto);
  }
}
