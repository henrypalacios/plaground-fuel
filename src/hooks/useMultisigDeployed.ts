import { getLocalStorageState, setLocalStorageState } from "@/utils/localStorage";
import { useEffect, useState } from "react";

const MULTISIG_ITEM = 'multisigId';

type UseMultisigDeployedReturnType = [string | null, (value: string | undefined) => void];

export const useMultisigDeployed = (): UseMultisigDeployedReturnType => {
  const [contractAddress, setContractAddress] = useState<string | null>(() => 
    getLocalStorageState<string>(MULTISIG_ITEM, '')
  );
  
  const _setContractAddress = (value: string | undefined) => {
    if (value === undefined) return
      
    setContractAddress(value)
  } 

  useEffect(() => {
    if (contractAddress !== null) {
      setLocalStorageState(MULTISIG_ITEM, contractAddress);
    }
  }, [contractAddress]);

  return [contractAddress, _setContractAddress] as const;
};
