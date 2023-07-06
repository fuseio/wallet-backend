import { Injectable } from '@nestjs/common';
import { TokenTransferWebhookDto, User } from 'lib/common/src';
import { UserClientProxy } from 'lib/common/src/client-proxies';
import { IMessage } from '../common/messages/imessage.interface';
import { TokenTransferMessageFactory } from '../common/messages/token-transfers/token-transfer-message.factory';
import { NotificationsService } from '../common/services/notifications.service';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class WebhooksService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService,
    private readonly userClient: UserClientProxy,
  ) {}

  async handleTokenTransfer(tokenTransferWebhookDto: TokenTransferWebhookDto) {
    const tokenAddress = tokenTransferWebhookDto.tokenAddress;
    const transferredStakingTokens =
      this.checkIfStakingTokensHaveBeenTransferred(tokenAddress);

    if (transferredStakingTokens) {
      console.info(
        'Not sending notifications for token transfer ',
        'since tokens that have been transferred were staking tokens.',
      );
      return;
    }

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

  private checkIfStakingTokensHaveBeenTransferred(tokenAddress: string) {
    const checksummedSFuseAddress = this.getChecksummedSFuseAddress();
    const checksummedXVoltAddress = this.getChecksummedXVoltAddress();

    const transferredStakingTokens =
      tokenAddress === checksummedSFuseAddress ||
      tokenAddress === checksummedXVoltAddress;

    return transferredStakingTokens;
  }

  private getChecksummedSFuseAddress() {
    const sFuseAddress = this.configService.getOrThrow('S_FUSE_TOKEN_ADDRESS');
    return ethers.getAddress(sFuseAddress);
  }

  private getChecksummedXVoltAddress() {
    const xVoltAddress = this.configService.getOrThrow('X_VOLT_TOKEN_ADDRESS');
    return ethers.getAddress(xVoltAddress);
  }

  private sendNotification(user: User, message: IMessage) {
    this.notificationsService.sendNotification(user, message);
  }
}
