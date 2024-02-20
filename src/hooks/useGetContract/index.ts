import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection"
import { FuelContractId, IContractAbiFactory } from "./types"

type Contract<T> = T | undefined

interface Props<T> {
   contractId: FuelContractId 
   contractAbiFactory: IContractAbiFactory<T>
}

interface UseGetContractReturn<T> {
 contract: Contract<T> 
}

export function useGetContract<T>({contractId, contractAbiFactory}: Props<T>): UseGetContractReturn<T> {
   const { wallet } = useNetworkConnection() 
   let contract: Contract<T>
   
   if (wallet) {
      contract = contractAbiFactory.connect(contractId, wallet) 
   }
   
   return { contract }
}