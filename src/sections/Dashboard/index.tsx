import { useState } from "react";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { FlexBox } from "../common/FlexBox";
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