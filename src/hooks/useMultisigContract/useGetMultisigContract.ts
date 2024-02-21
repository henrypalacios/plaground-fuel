import { FuelMultisigAbi, FuelMultisigAbi__factory,  } from "@/services/contracts/multisig"
import { useGetContract } from "../useGetContract"

interface Props {
   contractId: string
}


export function useGetMultisigContract({contractId}: Props) {
   const { contract } = useGetContract<FuelMultisigAbi>({contractId, 
      contractAbiFactory: FuelMultisigAbi__factory}) 
   
   return { contract }
}