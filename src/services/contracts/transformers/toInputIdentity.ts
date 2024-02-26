import { IdentityInput } from "../multisig/contracts/FuelMultisigAbi";

export function toIdentityInput(strings: string[]): IdentityInput[] {
    return strings.map((str) => {
      const identityInput: IdentityInput = { Address: { value: str } };
      return identityInput;
    });
  }