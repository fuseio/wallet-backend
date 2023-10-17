import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import FuseService from 'lib/common/src/services/fuse.service';
import {
  SubscribeTokenTransferDto,
  UnsubscribeTokenTransferDto,
} from 'lib/common/src/dtos';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly fuseService: FuseService) {}

  @MessagePattern('subcribe_token_transfers')
  subscribeTokenTransfers({ walletAddress }: SubscribeTokenTransferDto) {
    return this.fuseService.subscribeToNotifications([walletAddress]);
  }

  @MessagePattern('unsubcribe_token_transfers')
  unsubscribeTokenTransfers({ walletAddress }: UnsubscribeTokenTransferDto) {
    return this.fuseService.unsubscribeFromNotifications([walletAddress]);
  }
}
