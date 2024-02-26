import { useEffect, useMemo, useState } from "react"
import { useGetMultisigContract } from "@/hooks/useMultisigContract"
import { BadgeWalletInfo } from "../Layout/BadgeWalletInfo"
import { FlexBox } from "../common/FlexBox"
import { BASE_ASSET_ID, assetsMap } from "@/constant/assetsMap"
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter"
import CopyButton from "../common/CopyButton"
import LoadingButton from "../common/LoadingButton"
import IconButton from "../common/IconButton"
import { useBalance } from "@fuel-wallet/react"
import { SetupMultisigView, SetupMultisigViewType } from "./SetupMultisigView"
import { useGetThreshold } from "@/hooks/useMultisigContract/useGetThreshold"
import { SummaryMultisigLayout } from "./SummaryMultisig"

interface Props {
    contractId: string
    clearContractId: () => void
}


export function InteractionMultisig({contractId, clearContractId}: Props) {
    const {contract} = useGetMultisigContract({contractId})
    const [balance, setBalance] = useState<string | undefined>()
    const {balance: _balance, isFetching} = useBalance({address: contractId}) 
    const [view, setView] = useState<SetupMultisigViewType>('default')
    const {threshold, isLoading: isGettingThreshold, fetchThreshold} = useGetThreshold({contract})
    
    const viewProps = useMemo(() => {
        switch(view){
            case 'setup':
                return {actionTitle: 'Back', action: () => setView('default')}
            
            default:
                return {actionTitle: 'Set up 👤', action: () => setView('setup')}
    
        }
    }, [view])

    
    useEffect(() => {
        const _formatted = irregularToDecimalFormatted(_balance ?? undefined, {
            significantFigures: 4,
           assetInfo: assetsMap[BASE_ASSET_ID] 
        })
        setBalance(_formatted)
    }, [_balance])
    
    return (
    <FlexBox direction="column" gap="lg">
        <FlexBox gap="tiny" align="space-between" >
            <LoadingButton disabled={!threshold} isLoading={isGettingThreshold} onClick={viewProps.action}>
                Edit multisig
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
        <FlexBox isLoading={isGettingThreshold} outline center direction="column">
            {threshold ? (
                <SummaryMultisigLayout threshold={threshold} contract={contract} >
                    <>New Tx</>    
                </SummaryMultisigLayout> 
            ) : (
                <SetupMultisigView view={view} contract={contract} onSuccess={fetchThreshold} />
            )
            }
        </FlexBox>
    </FlexBox>
    )
}