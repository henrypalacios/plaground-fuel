import { useCallback, useEffect, useState } from "react";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useGetCounterContract } from "@/hooks/useGetCounterContract";


export function Dashboard() {
   const {contract} = useGetCounterContract()
   const {wallet, accountConnected} = useNetworkConnection()
   const [counter, setCounter] = useState(0)
   
  const getCount = useCallback(async () => {
    if (!contract) return

    try{
      const { value } = await contract.functions
      .count()
      .txParams({
        gasPrice: 1,
        gasLimit: 100_000,
      })
      .simulate();
      setCounter(value.toNumber());
    } catch(error) {
      console.error(error);
    }
  }, [contract])

  const onIncrementPressed = async () => {
    if (!contract) {
      return alert("Contract not loaded");
    }
    try {
      await contract.functions
      .increment()
      .txParams({
        gasPrice: 1,
        gasLimit: 100_000,
      })
      .call();
      await getCount();
    } catch(error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (!contract) return

    async function getInitialCount(){
      if(accountConnected && wallet){
        await getCount();
        // setContract(counterContract);
      }
    }
    
    getInitialCount();
  }, [accountConnected, contract, getCount, wallet]);


   if (!contract || !wallet) return
   
   return (

            <>
              <h3>Counter: {counter}</h3>
              <button onClick={onIncrementPressed}>
               Increment
               </button>
            </>
   ) 
}