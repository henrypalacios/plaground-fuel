import { Interface } from "fuels";
import { Provider, Account, AbstractAddress, BytesLike, DeployContractOptions, JsonAbi } from "fuels";

export type FuelContractId = string | AbstractAddress

export interface IContractAbiFactory<T> {
    readonly abi: JsonAbi;

    createInterface(): Interface;

    connect(
        id: FuelContractId,
        accountOrProvider: Account | Provider
    ): T;

    deployContract(
        bytecode: BytesLike,
        wallet: Account,
        options?: DeployContractOptions
    ): Promise<T>;
}