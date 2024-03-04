import { useState } from "react";
import { FlexBox } from "../common/FlexBox";
import InputTextField from "../common/InputTextField";
import LoadingButton from "../common/LoadingButton";
import { useCreateTransaction } from "@/hooks/useMultisigContract/useCreateTransaction";
import { FuelMultisigAbi } from "@/services/contracts/multisig";
import { isValidAddress } from "@/validations/blockchain";
import { toNumber } from "fuels";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";

interface Props {
   contract: FuelMultisigAbi | undefined
}

export function NewTransaction({contract}: Props) {
    const {wallet} = useNetworkConnection()
    const [to, setTo] = useState<string>(wallet?.address.toAddress() || '')
    const [amount, setAmount] = useState<number>(0)
    const {proposeTransaction, isLoading} = useCreateTransaction({contract})
    
    const _proposeTransaction = () => {
        const error = isValidAddress(to)
        if (error) {
            alert(error)
            return
        }
        proposeTransaction(to, amount)
    }

    return (
    <FlexBox direction="column" align="space-evenly">
        <FlexBox pl="lg" direction="column">
            <p>New Transaction</p>
        </FlexBox>

        <FlexBox center direction="column">
            <InputTextField 
                label={"To"} 
                name='to'
                value={to} 
                onChange={(e) => setTo(e.target.value)}
            />
            <InputTextField 
                label={"Amount"} 
                name="amount"
                value={amount} 
                type="number"
                onChange={(e) => setAmount(toNumber(e.target.value))}
                helperText="🚨 This transaction is mocked in the contract and will not interact with another contract or transfer funds."
            />
            <FlexBox>
                <LoadingButton isLoading={isLoading} onClick={_proposeTransaction}>Send 📝</LoadingButton>
            </FlexBox>
        </FlexBox>
    </FlexBox>
    )
}