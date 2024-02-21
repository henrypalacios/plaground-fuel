import { useCallback, useEffect, useState } from "react";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useGetCounterContract } from "@/hooks/useGetCounterContract";
import { FlexBox } from "../common/FlexBox";
import LoadingButton from "../common/LoadingButton";
import { useDeployMultisigContract } from "@/hooks/useMultisigContract";
import { FuelMultisigAbi } from "@/services/contracts/multisig";
import { NewMultisig } from "../NewMultisig";
import { InteractionMultisig } from "../InteractionMultisig";


export function Dashboard() {
   const {wallet} = useNetworkConnection()
   const [contractDeployed, setContractDeployed] = useState<string | undefined>()
   
   if (!wallet) return

   return (
    <FlexBox pt="lg">
      {!contractDeployed ? 
        (<NewMultisig setContract={setContractDeployed}/>)
      :
        (<InteractionMultisig contractId={contractDeployed}/>)
      }
    </FlexBox>
   ) 
}