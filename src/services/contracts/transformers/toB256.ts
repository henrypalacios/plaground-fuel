import { Address, isB256, isBech32 } from "fuels";

export function toB256(address: string, type?: 'address' | 'b256'): string {
    if (address.length === 63 && isBech32(address)) {
      return type === 'b256' ? Address.fromString(address).toB256() : Address.fromString(address).toAddress();
    } else if (isB256(address)) {
      return type === 'b256' ? address : Address.fromB256(address).toAddress();
    }   
    
    return ''
}