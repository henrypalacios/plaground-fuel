import { FuelMultisigAbi } from "@/services/contracts/multisig"
import { toIdentityInput } from "@/services/contracts/transformers/toInputIdentity"
import { getErrorMessage } from "@/utils/error"
import { FunctionInvocationResult } from "fuels"
import { useCallback, useState } from "react"

interface Props {
    contract: FuelMultisigAbi | undefined
}

interface UseSetupMultisigReturn {
    setupMultisig: (threshold: number, users: string[]) => Promise<FunctionInvocationResult<void, void> | undefined>
    isLoading: boolean
}

export function useSetupMultisig({contract}: Props) : UseSetupMultisigReturn {
    const [isLoading, setIsLoading] = useState(false)

    const setupMultisig = useCallback(async (threshold: number, users: string[]) => {
        if (!contract) return

        setIsLoading(true)
        const _usersIdentity = toIdentityInput(users)
        try {
            const cost = await contract.functions
            .constructor(threshold, _usersIdentity)
            .getTransactionCost() 

            const result = await contract.functions
                .constructor(threshold, _usersIdentity)
                .txParams({
                    gasPrice: cost.gasPrice,
                    gasLimit: cost.gasUsed.mul(1.1),
                })
                .call()
            
            return result
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            const msg = getErrorMessage(e)
            let defaultMsg = "An error has ocurred while trying to configure the multisig"
            
            if (e.cause && Array.isArray(e.cause.logs) && e.cause.logs.length) {
                defaultMsg = e.cause.logs[0]
            }             

            console.error(defaultMsg, msg)
        }
    }, [contract])


    return {setupMultisig, isLoading}
}