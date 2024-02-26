import React, { useEffect } from "react";
import { ReactElement } from "react";
import { FlexBox } from "../common/FlexBox";
import { UseGetListOwnersReturn, useGetListOwners } from "@/hooks/useMultisigContract/useGetListOwners";
import { FuelMultisigAbi } from "@/services/contracts/multisig";
import { useActiveTransactions } from "@/hooks/useMultisigContract/useActiveTransactions";
import { dashEmpty } from "@/utils/formatString";
import { OwnerTableProps } from "./OwnersTable";
import { TransactionEvents } from "@/hooks/useMultisigContract/types";

interface Props  {
    threshold: number
    contract: FuelMultisigAbi | undefined
    component: ReactElement<OwnerTableProps>
    fetchThreshold: () => void
}

type ChildProps = Pick<Props, 'component'> & {
    owners: UseGetListOwnersReturn['owners']
}

export function ChildComponent({component, owners}: ChildProps) {
    if (!owners) return null

    return React.cloneElement(component, { owners });
} 


export function SummaryMultisigLayout({component, contract, threshold, fetchThreshold}: Props) {
    const {owners} = useGetListOwners({contract})
    const {transactions, fetchTransactions} = useActiveTransactions({contract})

    useEffect(() => {
        document.addEventListener(TransactionEvents.transactionProposed, () => {
          fetchThreshold();
          fetchTransactions()
        });
    
        return () => {
          document.removeEventListener(TransactionEvents.transactionProposed, () => {
            fetchThreshold();
            fetchTransactions()
          });
        };
      }, [fetchThreshold, fetchTransactions]);

    return (
    <FlexBox direction="column" align="flex-start" center>
        <FlexBox gap="lg" align="space-evenly">
            <span>Current treshold: <b>{threshold}</b></span>
            <span>|</span>
            <span>Owners: <b>{dashEmpty(owners?.length)}</b></span>
            <span>|</span>
            <span>Active Transactions: <b>{dashEmpty(transactions)}</b></span>
        </FlexBox>
        <FlexBox pt="lg">
            <ChildComponent owners={owners} component={component} />
        </FlexBox>
    </FlexBox>
    )
}