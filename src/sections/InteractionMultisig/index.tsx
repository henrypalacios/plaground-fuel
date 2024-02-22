import { useGetMultisigContract } from "@/hooks/useMultisigContract"
import { BadgeWalletInfo } from "../Layout/BadgeWalletInfo"
import { FlexBox } from "../common/FlexBox"
import { useEffect, useState } from "react"
import { BASE_ASSET_ID, assetsMap } from "@/constant/assetsMap"
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter"
import CopyButton from "../common/CopyButton"

interface Props {
    contractId: string
}

export function InteractionMultisig({contractId}: Props) {
    const {contract} = useGetMultisigContract({contractId})
    const [balance, setBalance] = useState<string | undefined>()
    
    useEffect(() => {
        if (!contract) return
        

        contract.getBalance(BASE_ASSET_ID).then((value) => {
            const _balance = irregularToDecimalFormatted(value, {
                significantFigures: 4,
               assetInfo: assetsMap[BASE_ASSET_ID] 
            })
            setBalance(_balance)
        })
    }, [contract])

    return (
    <FlexBox gap="tiny">
        <BadgeWalletInfo isLoading={false} address={contractId} balanceData={balance} color="secondary">
            <CopyButton textToCopy={contractId} /> 
        </BadgeWalletInfo>
      </FlexBox>
    )
}