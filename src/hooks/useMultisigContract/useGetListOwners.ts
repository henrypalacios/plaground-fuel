import { FuelMultisigAbi } from "@/services/contracts/multisig"
import { identityInputToString } from "@/services/contracts/transformers/toInputIdentity"
import { getErrorMessage } from "@/utils/error"
import { useCallback, useEffect, useState } from "react"

interface Props {
   contract: FuelMultisigAbi | undefined 
}

interface UseGetListOwnersReturn {
   isLoading: boolean
   owners: string[] | undefined
   fetchOwners: () => void
}

export function useGetListOwners({contract}: Props): UseGetListOwnersReturn {
    const [isLoading, setIsLoading] = useState(true)
    const [owners, setOwners] = useState<UseGetListOwnersReturn['owners']>()
    
    const fetchOwners = useCallback(async () => {
        if (!contract) return;
    
        setIsLoading(true);
        try {
          const result = await contract.functions
            .get_owners()
            .txParams({
              gasPrice: 1,
              gasLimit: 100_000,
            })
            .simulate();
    
          if (result.value !== undefined) {
            setOwners(identityInputToString(result.value));
          }
        } catch (e) {
          const msg = getErrorMessage(e);
          console.error(msg);
        } finally {
          setIsLoading(false);
        }
      }, [contract]);
    
    useEffect(() => {
        fetchOwners();
    }, [fetchOwners])

    
    return {owners, isLoading, fetchOwners}

}