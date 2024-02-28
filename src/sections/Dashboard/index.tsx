import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { FlexBox } from "../common/FlexBox";
import { NewMultisig } from "../NewMultisig";
import { InteractionMultisig } from "../InteractionMultisig";
import { useMultisigDeployed } from "@/hooks/useMultisigDeployed";
import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import ErrorBox from "../common/ErrorBox";


export function Dashboard() {
   const {wallet} = useNetworkConnection()
   const [contractDeployed, setContractDeployed] = useMultisigDeployed();
   const {error, setError} = useInteractionError()
   
   if (!wallet) return

   return (
    <FlexBox pt="lg" direction="column">
      {error?.msg && <ErrorBox error={error} clearError={() => setError(null)} /> }
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