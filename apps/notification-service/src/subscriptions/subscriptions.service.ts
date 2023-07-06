import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import ChargeService from 'lib/common/src/services/charge.service';
import {
  SubscribeTokenTransferDto,
  UnsubscribeTokenTransferDto,
} from 'lib/common/src/dtos';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly chargeService: ChargeService) {}

  @MessagePattern('subcribe_token_transfers')
  subscribeTokenTransfers({ walletAddress }: SubscribeTokenTransferDto) {
    return this.chargeService.subscribeToNotifications([walletAddress]);
  }

  @MessagePattern('unsubcribe_token_transfers')
  unsubscribeTokenTransfers({ walletAddress }: UnsubscribeTokenTransferDto) {
    return this.chargeService.unsubscribeFromNotifications([walletAddress]);
  }
}
