import { counterContractId } from "@/constant/contractId"
import { CounterContractAbi, CounterContractAbi__factory } from "@/services/contracts/counter"
import { useGetContract } from "./useGetContract"


export function useGetCounterContract() {
   const { contract } = useGetContract<CounterContractAbi>({contractId: counterContractId, 
      contractAbiFactory: CounterContractAbi__factory}) 
   
   return { contract }
}