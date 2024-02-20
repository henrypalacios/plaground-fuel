import { BN } from "fuels";

interface Options {
    decimals?: number;
}

// convert decimal to planck unit e.g. 1.0000  to 1000000000000
export const planckToDecimal = (
    amount: undefined | string | number | number[] | BN | Uint8Array | Buffer,
    options: Options
  ): number | undefined => {
    const decimals =
      options.decimals !== undefined
        ? options.decimals
        : 0;
  
    if (!decimals || !amount) return;
    if (decimals === undefined || amount === undefined) return;
  
    const base = new BN(10).pow(new BN(decimals));
    const { div, mod } = new BN(amount).divmod(base);
  
    return parseFloat(
      `${div.toString()}.${mod.toString().padStart(decimals, "0")}`
    );
  };
  
interface planckToDecimalOptions {
    significantFigures?: number;
    symbol?: string;
}
  

// convert planck unit to decimal with token name (ETH)  e.g. 100000000000 to 1.0000 ETH
export const planckToDecimalFormatted = (
    amount: undefined | string | number | number[] | BN | Uint8Array | Buffer,
    options: planckToDecimalOptions & Options
  ): string | undefined => {
    const decimalAmount = planckToDecimal(amount, options);
    if (decimalAmount === undefined) return;
  
    const formattedVal =
      options?.significantFigures === undefined
        ? decimalAmount.toString()
        : decimalAmount.toFixed(options?.significantFigures).toString();
  
    const symbol = options?.symbol
      ? options.symbol
      : "";
  
    return `${formattedVal} ${symbol}`;
  };
  

// convert decimal to planck unit e.g. 1.0000  to 1000000000000
export const decimalToPlanck = (
    amount: number,
    options: Options | undefined
  ): bigint | undefined => {
    const decimals = options?.decimals || 0;
    if (!decimals) return;
  
    const convertedValue = BigInt(amount * 10 ** decimals);
  
    return convertedValue;
  };
  
  