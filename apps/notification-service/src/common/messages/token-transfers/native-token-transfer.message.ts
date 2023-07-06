import { formatTokenAmount } from 'lib/common/src/utils/number';
import { TokenTransferWebhookDto } from 'lib/common/src/dtos';
import { IMessage } from '../imessage.interface';

export class NativeTokenTransferMessage implements IMessage {
  constructor(
    private readonly tokenTransferWebhookDto: TokenTransferWebhookDto,
  ) {}

  getType() {
    return 'nativeTokenTransfer';
  }

  getData() {
    return {};
  }

  getTitle() {
    return 'You got funds! 🎉';
  }

  getBody() {
    const amount = formatTokenAmount(this.tokenTransferWebhookDto.value, 18);
    return `${amount} ${this.tokenTransferWebhookDto.tokenSymbol} arrived click here to review`;
  }

  getNotification() {
    return { title: this.getTitle(), body: this.getBody() };
  }
}
