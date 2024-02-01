export function getTruncatedAddress(
    address: string | undefined,
    startIndex = 6,
    endIndex = -4
  ): string {
    if (!address) return "-";
  
    return `${address.slice(0, startIndex)}...${address.slice(endIndex)}`;
  }
  
  