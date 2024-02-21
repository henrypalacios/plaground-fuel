import { useState } from "react";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useGetCounterContract } from "@/hooks/useGetCounterContract";
import { useDeployMultisigContract } from "@/hooks/useMultisigContract";
import { FlexBox } from "../common/FlexBox";
import LoadingButton from "../common/LoadingButton";

interface Props {
  setContract: (contractId: string | undefined) => void
}


export function NewMultisig({setContract}: Props) {
   const {deployContract, error} = useDeployMultisigContract()
   
   const _deployContract = () => {
    deployContract().then(setContract)
   }
   

   if (error) return <h3>{error}</h3>

   return (
    <>
      <LoadingButton onClick={_deployContract}>
        <FlexBox gap="tiny">
          <span>
            ➕ 
          </span>        
          new account
        </FlexBox>
      </LoadingButton>
    </>
   ) 
}