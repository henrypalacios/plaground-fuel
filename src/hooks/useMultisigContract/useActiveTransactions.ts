import { useCallback, useEffect, useState } from "react"
import { FuelMultisigAbi } from "@/services/contracts/multisig"
import { getErrorMessage } from "@/utils/error"

interface Props {
   contract: FuelMultisigAbi | undefined 
}

interface UseActiveTransactionReturn {
   isLoading: boolean
   transactions: number | undefined 
   fetchTransactions: () => void
}

export function useActiveTransactions({contract}: Props): UseActiveTransactionReturn {
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState<UseActiveTransactionReturn['transactions']>()
    
    const fetchTransactions = useCallback(async () => {
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
            setTransactions(result.value);
          }
        } catch (e) {
          const msg = getErrorMessage(e);
          console.error(msg);
        } finally {
          setIsLoading(false);
        }
      }, [contract]);
    
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions])

    
    return {transactions, isLoading, fetchTransactions}

}