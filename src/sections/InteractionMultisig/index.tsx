import { useGetMultisigContract } from "@/hooks/useMultisigContract"
import { BadgeWalletInfo } from "../Layout/BadgeWalletInfo"
import { FlexBox } from "../common/FlexBox"
import { useEffect, useState } from "react"
import { BASE_ASSET_ID, assetsMap } from "@/constant/assetsMap"
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter"
import CopyButton from "../common/CopyButton"
import LoadingButton from "../common/LoadingButton"
import IconButton from "../common/IconButton"
import { useBalance } from "@fuel-wallet/react"

interface Props {
    contractId: string
    clearContractId: () => void
}

export function InteractionMultisig({contractId, clearContractId}: Props) {
    const {contract} = useGetMultisigContract({contractId})
    const [balance, setBalance] = useState<string | undefined>()
    const {balance: _balance, isFetching} = useBalance({address: contractId}) 

    
    useEffect(() => {
        if (!contract) return
        
        const _formatted = irregularToDecimalFormatted(_balance ?? undefined, {
            significantFigures: 4,
           assetInfo: assetsMap[BASE_ASSET_ID] 
        })
        setBalance(_formatted)
    }, [_balance, contract])

    return (
    <FlexBox gap="tiny" align="space-between">
        <LoadingButton onClick={() => alert('🚧 Not Implemented!')}>
            Set up 👤
        </LoadingButton>
        <BadgeWalletInfo isLoading={isFetching} address={contractId} balanceData={balance} color="secondary">
            <FlexBox>
                <CopyButton textToCopy={contractId} /> 
                <IconButton onClick={clearContractId} > 
                    ❌
                </IconButton> 
            </FlexBox>
        </BadgeWalletInfo>
      </FlexBox>
    )
}