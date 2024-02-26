import { useCallback, useState } from "react"
import { FuelMultisigAbi } from "@/services/contracts/multisig"
import { toIdentityInput } from "@/services/contracts/transformers/toInputIdentity"
import { getErrorMessage } from "@/utils/error"
import { FunctionInvocationResult } from "fuels"

interface Props {
    contract: FuelMultisigAbi | undefined
}

interface UseCreateTransactionReturn {
    proposeTransaction: (to: string, amount: number) => Promise<FunctionInvocationResult<void, void> | undefined>
    isLoading: boolean
}

export function useCreateTransaction({contract}: Props) : UseCreateTransactionReturn {
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
                    gasLimit: cost.gasUsed.mul(1.1),
                })
                .call()
            
            return result
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            const msg = getErrorMessage(e)
            let defaultMsg = "An error has ocurred while trying to propose new Transaction"
            
            if (e.cause && Array.isArray(e.cause.logs) && e.cause.logs.length) {
                defaultMsg = e.cause.logs[0]
            }             

            console.error(defaultMsg, msg)
        } finally {
            setIsLoading(false)
        }
    }, [contract])


    return {proposeTransaction, isLoading}
}