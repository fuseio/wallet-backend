import { formatUnits } from 'ethers';
import numeral from 'numeral';

export function formatTokenAmount(tokenAmount: string, tokenDecimals: number) {
  const rawValue = formatUnits(tokenAmount, tokenDecimals);
  const formatConfig = Number(rawValue) < 1 ? '0.000000000' : '0,0.00';

  return numeral(rawValue).format(formatConfig);
}
