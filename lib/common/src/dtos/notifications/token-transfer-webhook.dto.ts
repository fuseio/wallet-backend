export class TokenTransferWebhookDto {
  to: string;

  from: string;

  value: string;

  tokenType?: string;

  tokenAddress?: string;

  tokenName?: string;

  tokenSymbol?: string;

  tokenDecimals?: string;
}
