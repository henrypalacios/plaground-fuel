import { useCallback, useEffect, useState } from "react"
import { FuelMultisigAbi } from "@/services/contracts/multisig"
import { getErrorMessage } from "@/utils/error"

interface Props {
   contract: FuelMultisigAbi | undefined 
}

interface UseGetThresholdReturn {
   isLoading: boolean
   threshold: number | undefined 
   fetchThreshold: () => void
}

export function useGetThreshold({contract}: Props): UseGetThresholdReturn {
    const [isLoading, setIsLoading] = useState(true)
    const [threshold, setThreshold] = useState<UseGetThresholdReturn['threshold']>()
    
    const fetchThreshold = useCallback(async () => {
        if (!contract) return;
    
        setIsLoading(true);
        try {
          const result = await contract.functions
            .get_threshold()
            .txParams({
              gasPrice: 1,
              gasLimit: 100_000,
            })
            .simulate();
    
          if (result.value !== undefined) {
            setThreshold(result.value);
          }
        } catch (e) {
          const msg = getErrorMessage(e);
          console.error(msg);
        } finally {
          setIsLoading(false);
        }
      }, [contract]);
    
    useEffect(() => {
        fetchThreshold();
    }, [fetchThreshold])

    
    return {threshold, isLoading, fetchThreshold}

}