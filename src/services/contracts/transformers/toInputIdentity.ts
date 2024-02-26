import { AddressInput, IdentityInput } from "../multisig/contracts/FuelMultisigAbi";
import { toB256 } from "./toB256";

export function toIdentityInput(strings: string[]): IdentityInput[] {
    return strings.map((str) => {
      const identityInput: IdentityInput = { Address: { value: str } };
      return identityInput;
    });
  }

export function identityInputToString(identities: IdentityInput[]): string[] {
    return identities.map((obj) => {
      return toB256((obj.Address as AddressInput).value);
    });
  }