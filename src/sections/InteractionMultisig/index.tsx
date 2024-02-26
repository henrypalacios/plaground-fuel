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
import { SetupMultisigView } from "./SetupMultisigView"
import { useGetThreshold } from "@/hooks/useMultisigContract/useGetThreshold"
import { SummaryMultisigLayout } from "./SummaryMultisig"
import { OwnersTable } from "./OwnersTable"
import { NewTransaction } from "./NewTransaction"

export type InteractionViewType = 'default' | 'transaction'

interface Props {
    contractId: string
    clearContractId: () => void
}


export function InteractionMultisig({contractId, clearContractId}: Props) {
    const {contract} = useGetMultisigContract({contractId})
    const [balance, setBalance] = useState<string | undefined>()
    const {balance: _balance, isFetching} = useBalance({address: contractId}) 
    const [view, setView] = useState<InteractionViewType>('default')
    const {threshold, isLoading: isGettingThreshold, fetchThreshold} = useGetThreshold({contract})
    
    useEffect(() => {
        const _formatted = irregularToDecimalFormatted(_balance ?? undefined, {
            significantFigures: 4,
           assetInfo: assetsMap[BASE_ASSET_ID] 
        })
        setBalance(_formatted)
    }, [_balance])
    
    const ViewSelected = useMemo(() => {
        if (view === 'transaction') {
            return <NewTransaction />
        }
        
        return <OwnersTable owners={[]} /> 
    }, [view])
    
    return (
    <FlexBox direction="column" gap="lg">
        <FlexBox gap="tiny" align="space-between" >
            <FlexBox>
                <LoadingButton disabled={!threshold} isLoading={isGettingThreshold} onClick={() => setView('default')}>
                    👥 Owners
                </LoadingButton>
                <LoadingButton disabled={!threshold} isLoading={isGettingThreshold} onClick={() => setView('transaction')}>
                    💸 Transaction
                </LoadingButton>
            </FlexBox>
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
                <SummaryMultisigLayout threshold={threshold} contract={contract} component={ViewSelected} />
            ) : (
                <SetupMultisigView contract={contract} onSuccess={fetchThreshold} />
            )
            }
        </FlexBox>
    </FlexBox>
    )
}