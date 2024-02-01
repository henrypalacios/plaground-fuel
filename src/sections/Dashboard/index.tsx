import { useNetworkConnection } from "@/context/useNetworkConnection";
import { useGetContract } from "@/hooks/useGetContract";
import { useCallback, useEffect, useState } from "react";


export function Dashboard() {
   const {contract} = useGetContract()
   const {wallet} = useNetworkConnection()
   const [counter, setCounter] = useState(0)
   
   const getCount = useCallback(async() => {
      if (contract) {
        const { value } = await contract.functions.count().simulate();
        setCounter(value.toNumber());
      }
    }, [contract])

   useEffect(() => {
      if (!contract) return 

      getCount()
   }, [getCount, contract])

    async function increment() {
      if (contract) {
        // Creates a transactions to call the increment function
        // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
        try {
          await contract.functions.increment().txParams({ gasPrice: 1 }).call();
          getCount();
        } catch (err) {
          console.log("error sending transaction...", err);
        }
      }
    }

   if (!contract || !wallet) return
   
   return (

            <>
              <h3>Counter: {counter}</h3>
              <button onClick={increment}>
               Increment
               </button>
            </>
   ) 
}