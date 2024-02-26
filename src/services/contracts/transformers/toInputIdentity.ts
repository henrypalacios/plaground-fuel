import { AddressInput, IdentityInput } from "../multisig/contracts/FuelMultisigAbi";
import { toB256 } from "./toB256";

export function toIdentityInput(strings: string[]): IdentityInput[] {
    return strings.map((str) => {
      const identityInput: IdentityInput = { Address: { value: toB256(str, 'b256') } };
      return identityInput;
    });
  }

export function identityInputToB256(identities: IdentityInput[]): string[] {
    return identities.map((obj) => {
      return toB256((obj.Address as AddressInput).value, 'b256');
    });
  }

export function identityInputToAddress(identities: IdentityInput[]): string[] {
    return identities.map((obj) => {
      return toB256((obj.Address as AddressInput).value);
    });
  }