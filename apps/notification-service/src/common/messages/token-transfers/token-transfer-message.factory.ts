import { TokenType } from '../../enums/token-type.enum';
import { TokenTransferWebhookDto } from 'lib/common/src/dtos';
import { Erc20TokenTransferMessage } from './erc20-token-transfer.message';
import { Erc721TokenTransferMessage } from './erc721-token.-transfer.message';
import { NativeTokenTransferMessage } from './native-token-transfer.message';
import { IMessage } from '../imessage.interface';

export class TokenTransferMessageFactory {
  static create(tokenTransferWebhookDto: TokenTransferWebhookDto): IMessage {
    switch (tokenTransferWebhookDto.tokenType) {
      case TokenType.ERC20:
        return new Erc20TokenTransferMessage(tokenTransferWebhookDto);
      case TokenType.ERC721:
        return new Erc721TokenTransferMessage(tokenTransferWebhookDto);
      case TokenType.FUSE:
        return new NativeTokenTransferMessage(tokenTransferWebhookDto);
      default:
        throw new Error('Unknown token type');
    }
  }
}
