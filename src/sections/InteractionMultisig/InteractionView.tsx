import { FuelMultisigAbi } from "@/services/contracts/multisig"
import { FlexBox } from "../common/FlexBox"
import InputTextField from "../common/InputTextField"
import LoadingButton from "../common/LoadingButton"
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection"
import { useCallback } from "react"
import { getErrorMessage } from "@/utils/error"
import { IdentityInput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi"
import { devNull } from "os"

export type InterctionViewType = 'default' | 'setup'

interface Props {
    view: InterctionViewType    
    contract: FuelMultisigAbi
}

export function InteractionView({view, contract}: Props) {
    const {wallet} = useNetworkConnection()
    const threshold = 1
    
    const setupMultisig = useCallback(async () => {
        if (!contract) return

        try {
            const cost = await contract.functions
            .constructor(threshold, [{Address: {value: wallet?.address.toB256()}} as IdentityInput])
            .getTransactionCost() 
            const result = await contract.functions
                .constructor(threshold, [{Address: {value: wallet?.address.toB256()}} as IdentityInput])
                .txParams({
                    gasPrice: cost.gasPrice,
                    gasLimit: cost.gasUsed.mul(1.1),
                })
                .dryRun()
            
            // const value = await contract.functions
            // .get_active_tx_ids()
            // .txParams({ gasPrice: cost.gasPrice, gasLimit: cost.gasUsed.mul(2) }) 
            // .simulate()


            // console.log('__result', cost.gasUsed.toString(), cost.gasPrice.toString())
            console.log('__', result)
        } catch (e) {
            const msg = getErrorMessage(e)
            
            console.dir(e, {depth: null})
            console.error('__error', e.cause.logs)
        }
    }, [wallet, contract])

    if (view === 'default') {
        return null
    } 
    
    return (
        <FlexBox outline center direction="column">
        <InputTextField 
            label={"Signer"} 
            value={wallet?.address.toB256() || ''} 
        />
        <InputTextField label={"Threshold"} 
            defaultValue={''} 
            value={threshold.toString()} 
        />
            
            <FlexBox>
                <LoadingButton onClick={setupMultisig}>Sign and send</LoadingButton>
            </FlexBox>
        </FlexBox>
    )

}