import { PropsWithChildren } from "react";
import { FlexBox } from "../common/FlexBox";
import { useGetListOwners } from "@/hooks/useMultisigContract/useGetListOwners";
import { FuelMultisigAbi } from "@/services/contracts/multisig";
import { useActiveTransactions } from "@/hooks/useMultisigContract/useActiveTransactions";

interface Props extends PropsWithChildren {
    threshold: number
    contract: FuelMultisigAbi | undefined
}

function dashEmpty(value: number | string | undefined) {
    if (value === undefined) return '-'
    
    return value
}

export function SummaryMultisigLayout({children, contract, threshold}: Props) {
    const {owners} = useGetListOwners({contract})
    const {transactions} = useActiveTransactions({contract})

    return (
    <FlexBox direction="column" align="flex-start" center>
        <FlexBox gap="lg" align="space-evenly">
            <span>Current treshold: <b>{threshold}</b></span>
            <span>|</span>
            <span>Owners: <b>{dashEmpty(owners?.length)}</b></span>
            <span>|</span>
            <span>Active Transactions: <b>{dashEmpty(transactions)}</b></span>
        </FlexBox>
        {children}
    </FlexBox>
    )
}