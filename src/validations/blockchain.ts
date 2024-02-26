import { isBech32, isB256 } from 'fuels';

export function isValidAddress(address: string): string | undefined {
  if (!(isBech32(address) || isB256(address))) {
    return 'Invalid address format';
  }

  return undefined;
}
