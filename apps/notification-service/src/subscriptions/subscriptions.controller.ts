import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  SubscribeTokenTransferDto,
  UnsubscribeTokenTransferDto,
} from 'lib/common/src';
import { SubscriptionsService } from './subscriptions.service';

@Controller('notifications')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @MessagePattern('subscribe_token_transfers')
  subscribeTokenTransfers(
    subscribeTokenTransfersDto: SubscribeTokenTransferDto,
  ) {
    this.subscriptionService.subscribeTokenTransfers(
      subscribeTokenTransfersDto,
    );
  }

  @MessagePattern('unsubscribe_token_transfers')
  unsubscribeTokenTransfers(
    unsubscribeTokenTransfersDto: UnsubscribeTokenTransferDto,
  ) {
    this.subscriptionService.unsubscribeTokenTransfers(
      unsubscribeTokenTransfersDto,
    );
  }
}
