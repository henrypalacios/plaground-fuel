import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import {FuelWalletLocked} from "@fuel-wallet/sdk"

type NetworkConnectionError = 'FAILED_TO_CONNECT' | 'WALLET_NOT_DETECTED' | 'ACCOUNTS_NOT_FOUND'


interface NetworkConnectionContextType {
  isLoading: boolean;
  accounts: string[];
  error: NetworkConnectionError | undefined;
  accountConnected: string | undefined;
  wallet: FuelWalletLocked | undefined | null; // null when is loaded and to connected
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

export const NetworkConnectionContext = createContext<NetworkConnectionContextType | undefined>(undefined);

interface NetworkConnectionProviderProps {
  children: ReactNode;
}

export const NetworkConnectionProvider: React.FC<NetworkConnectionProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<NetworkConnectionContextType['error']>();
  const [accounts, setAccounts] = useState<NetworkConnectionContextType['accounts']>([]);
  const [accountConnected, setAccountConnected] = useState<NetworkConnectionContextType['accountConnected']>();
  const [wallet, setWallet] = useState<NetworkConnectionContextType['wallet']>();
  
  useEffect(() => {
    const onLoad = () => {
      setIsLoading(true);
      checkConnection();
      setIsLoading(false);
    }
    document.addEventListener("FuelLoaded", onLoad);
    
    return () => {
      document.removeEventListener("FuelLoaded", onLoad);
    };
  }, [])
  
  useEffect(() => {
    if (!accountConnected || !window.fuel) return
    
    window.fuel.getWallet(accountConnected).then((wallet) => setWallet(wallet))
  }, [accountConnected])
  
  async function checkConnection() {
    if (!window.fuel) return

    const isConnected = await window.fuel.isConnected();
    if (isConnected) {
      const accounts = await window.fuel.accounts();
      setAccounts(accounts);
      accounts.length && setAccountConnected(accounts[0]);
      if (accounts.length) {
        setAccountConnected(accounts[0]);
      } else {
        setError('ACCOUNTS_NOT_FOUND')
        setWallet(null)
      }
    }
  }

  const connectWallet = useCallback(async () => {
      if (!window.fuel) return

      try {
        setIsLoading(true)
        await window.fuel.connect();
        checkConnection()
      } catch (err) {
        console.log("error connecting: ", err);
        setError('FAILED_TO_CONNECT')
      } finally {
        setIsLoading(false)
      }
  }, []);

  const disconnectWallet = async () => {
    if (!window.fuel) return
    
    await window.fuel.disconnect()
    setAccounts([]);
    setAccountConnected(undefined);
    setWallet(undefined)
  };

  return (
    <NetworkConnectionContext.Provider value={{ wallet, accounts, accountConnected, isLoading, error, connectWallet, disconnectWallet }}>
      {children}
    </NetworkConnectionContext.Provider>
  );
};

