import { TokenTransferWebhookDto } from 'lib/common/src/dtos';
import { IMessage } from '../imessage.interface';

export class Erc721TokenTransferMessage implements IMessage {
  constructor(
    private readonly tokenTransferWebhookDto: TokenTransferWebhookDto,
  ) {}

  getType() {
    return 'erc721TokenTransfer';
  }

  getData() {
    const tokenAddress = this.tokenTransferWebhookDto.tokenAddress;
    if (tokenAddress === undefined) return {};
    return { tokenAddress: tokenAddress };
  }

  getTitle() {
    return 'You got a collectible!';
  }

  getBody() {
    return `${this.tokenTransferWebhookDto.tokenSymbol} NFT arrived click here to review`;
  }

  getNotification() {
    return { title: this.getTitle(), body: this.getBody() };
  }
}
