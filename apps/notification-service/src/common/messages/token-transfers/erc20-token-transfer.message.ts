import { TokenTransferWebhookDto } from 'lib/common/src/dtos';
import { formatTokenAmount } from 'lib/common/src/utils/number';
import { IMessage } from '../imessage.interface';

export class Erc20TokenTransferMessage implements IMessage {
  constructor(
    private readonly tokenTransferWebhookDto: TokenTransferWebhookDto,
  ) {}

  getType() {
    return 'erc20TokenTransfer';
  }

  getData() {
    return {};
  }

  getTitle() {
    return 'You got funds! 🎉';
  }

  getBody() {
    const amount = formatTokenAmount(
      this.tokenTransferWebhookDto.value,
      Number(this.tokenTransferWebhookDto.tokenDecimals),
    );
    return `${amount} ${this.tokenTransferWebhookDto.tokenSymbol} arrived click here to review`;
  }

  getNotification() {
    return { title: this.getTitle(), body: this.getBody() };
  }
}
