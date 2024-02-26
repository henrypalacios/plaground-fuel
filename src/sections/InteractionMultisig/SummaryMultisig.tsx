import { PropsWithChildren } from "react";
import { FlexBox } from "../common/FlexBox";
import { useGetListOwners } from "@/hooks/useMultisigContract/useGetListOwners";
import { FuelMultisigAbi } from "@/services/contracts/multisig";

interface Props extends PropsWithChildren {
    threshold: number
    contract: FuelMultisigAbi | undefined
}

export function SummaryMultisigLayout({children, contract, threshold}: Props) {
    const {owners} = useGetListOwners({contract})

    return (
    <FlexBox direction="column" align="flex-start" center>
        <FlexBox gap="lg" align="space-evenly">
            <span>Current treshold: <b>{threshold}</b></span>
            <span>|</span>
            <span>Owners: <b>{owners?.length || '-'}</b></span>
            <span>|</span>
            <span>Active Transactions: </span>
        </FlexBox>
        {children}
    </FlexBox>
    )
}