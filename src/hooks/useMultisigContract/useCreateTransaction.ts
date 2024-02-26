import { useCallback, useState } from "react"
import { FuelMultisigAbi } from "@/services/contracts/multisig"
import { toIdentityInput } from "@/services/contracts/transformers/toInputIdentity"
import { getErrorMessage } from "@/utils/error"
import { FunctionInvocationResult } from "fuels"
import { TransactionEvents } from "./types"

interface Props {
    contract: FuelMultisigAbi | undefined
    onSuccess?: (result: FunctionInvocationResult<void, void> | undefined) => void
}

interface UseCreateTransactionReturn {
    proposeTransaction: (to: string, amount: number) => Promise<FunctionInvocationResult<void, void> | undefined>
    isLoading: boolean
}

export function useCreateTransaction({contract, onSuccess}: Props) : UseCreateTransactionReturn {
    const [isLoading, setIsLoading] = useState(false)

    const proposeTransaction = useCallback(async (to: string, amount: number) => {
        if (!contract) return

        setIsLoading(true)
        const _usersIdentity = toIdentityInput([to])

        try {
            const cost = await contract.functions
            .propose_tx({to: _usersIdentity[0], data: amount})
            .getTransactionCost() 

            const result = await contract.functions
                .propose_tx({to: _usersIdentity[0], data: amount})
                .txParams({
                    gasPrice: cost.gasPrice,
                    gasLimit: cost.gasUsed.mul(20),
                })
                .call()
            
            document.dispatchEvent(
                new CustomEvent(TransactionEvents.transactionProposed)
            );
              
            onSuccess?.(result)
            return result
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.dir(e, {depth: null})
            const msg = getErrorMessage(e)
            let defaultMsg = "An error has ocurred while trying to propose new Transaction"
            
            if (e.cause && Array.isArray(e.cause.logs) && e.cause.logs.length) {
                defaultMsg = e.cause.logs[0]
            }             

            console.error(defaultMsg, msg)
        } finally {
            setIsLoading(false)
        }
    }, [contract, onSuccess])


    return {proposeTransaction, isLoading}
}