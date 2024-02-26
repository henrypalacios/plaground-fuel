import { useDeployMultisigContract } from "@/hooks/useMultisigContract";
import { FlexBox } from "../common/FlexBox";
import LoadingButton from "../common/LoadingButton";

interface Props {
  setContract: (contractId: string | undefined) => void
}


export function NewMultisig({setContract}: Props) {
   const {deployContract, error, isLoading} = useDeployMultisigContract()
   
   const _deployContract = () => {
    deployContract().then(setContract)
   }
   

   if (error) return <h3>{error}</h3>

   return (
    <FlexBox direction="column" gap="lg">
      <LoadingButton onClick={_deployContract}>
        <FlexBox gap="tiny">
          <span>
            ➕ 
          </span>        
          new account
        </FlexBox>
      </LoadingButton>
      <FlexBox isLoading={isLoading} outline center direction="column">
        <p>You don't have an account registered.</p>
      </FlexBox>

    </FlexBox>
   ) 
}