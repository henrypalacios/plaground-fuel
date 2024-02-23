import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { FlexBox } from "../common/FlexBox";
import { NewMultisig } from "../NewMultisig";
import { InteractionMultisig } from "../InteractionMultisig";
import { useMultisigDeployed } from "@/hooks/useMultisigDeployed";


export function Dashboard() {
   const {wallet} = useNetworkConnection()
   const [contractDeployed, setContractDeployed] = useMultisigDeployed();
   
   if (!wallet) return

   return (
    <FlexBox pt="lg">
      {!contractDeployed ? 
        (<NewMultisig setContract={setContractDeployed}/>)
      :
        (
          <InteractionMultisig 
            clearContractId={() => setContractDeployed('')} 
            contractId={contractDeployed}
          />
        )
      }
    </FlexBox>
   ) 
}