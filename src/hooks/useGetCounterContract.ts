import { COUNTER_CONTRACT_ID } from "@/constant/contractId"
import { CounterContractAbi, CounterContractAbi__factory } from "@/services/contracts/counter"
import { useGetContract } from "./useGetContract"


export function useGetCounterContract() {
   const { contract } = useGetContract<CounterContractAbi>({contractId: COUNTER_CONTRACT_ID, 
      contractAbiFactory: CounterContractAbi__factory}) 
   
   return { contract }
}