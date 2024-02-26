import { Address, isB256, isBech32 } from "fuels";

export function toB256(address: string): string {
    if (address.length === 63 && isBech32(address)) {
      return Address.fromString(address).toB256();
    } else if (isB256(address)) {
      return address;
    }   
    
    return ''
}