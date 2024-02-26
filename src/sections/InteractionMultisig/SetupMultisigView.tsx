import { FuelMultisigAbi } from "@/services/contracts/multisig"
import { FlexBox } from "../common/FlexBox"
import InputTextField from "../common/InputTextField"
import LoadingButton from "../common/LoadingButton"
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection"
import { useEffect, useState } from "react"
import { useSetupMultisig } from "@/hooks/useMultisigContract/useSetupMultisig"


interface Props {
    contract: FuelMultisigAbi | undefined
    onSuccess: () => void
}

const DEFAULT_THRESHOLD = 1

export function SetupMultisigView({contract, onSuccess}: Props) {
    const {wallet} = useNetworkConnection()
    const [txId, setTxId] = useState<string | undefined>()
    const {setupMultisig, isLoading} = useSetupMultisig({contract})
    const [signer, setSigner] = useState<string>(wallet?.address.toB256() || '')
    const [threshold, setThreshold] = useState<number>(DEFAULT_THRESHOLD)
    
    useEffect(() => {
        if (!txId) return

        onSuccess()
    }, [onSuccess, txId])
    
    const _setupMultisig = async () => {
        const result = await setupMultisig(threshold, [signer])
        
        if (result?.transactionId) {
            console.info('__result', result)
            setTxId(result.transactionId)
        }
    }

    if (!contract) {
        return null
    } 
    
    return (
        <FlexBox direction="column" align="space-evenly">
            <FlexBox pl="lg" direction="column">
                <p>Account must be configured</p>
            </FlexBox>

            <FlexBox center direction="column">
                <InputTextField 
                    label={"Signer"} 
                    name='signer'
                    value={signer} 
                    onChange={() => setSigner}
                />
                <InputTextField label={"Threshold"} 
                    name="threshold"
                    value={threshold} 
                    type="number"
                    onChange={() => setThreshold}
                />
                <FlexBox>
                    <LoadingButton isLoading={isLoading} onClick={_setupMultisig}>Set up 👤</LoadingButton>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )

}