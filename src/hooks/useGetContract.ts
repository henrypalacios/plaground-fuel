import { useNetworkConnection } from "@/context/useNetworkConnection"
import { CounterContractAbi, CounterContractAbi__factory } from "@/services/contracts/counter"

const CONTRACT_ID = "0x4a3ccc6263e32cfdd076fbe51748fb5aec5b3ffed588c0822b00d61edd008d9b"

type Contract = CounterContractAbi | undefined

interface UseGetContractReturn {
 contract: Contract 
}

export function useGetContract(): UseGetContractReturn {
   const { wallet } = useNetworkConnection() 
   let contract: Contract
   
   if (wallet) {
      contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet) 
   }
   
   return { contract }
}