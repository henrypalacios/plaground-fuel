import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import {FuelWalletLocked} from "@fuel-wallet/sdk"
import { useDisconnect, useIsConnected, useWallet, useAccount, useConnectUI, useConnect, useConnectors, useChain } from '@fuel-wallet/react';

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
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<NetworkConnectionContextType['error']>();
  const [accounts, setAccounts] = useState<NetworkConnectionContextType['accounts']>([]);
  // const [accountConnected, setAccountConnected] = useState<NetworkConnectionContextType['accountConnected']>();
  // const [wallet, setWallet] = useState<NetworkConnectionContextType['wallet']>();
  const { wallet, isLoading } = useWallet();
  const { isConnected } = useIsConnected();
  const {account} = useAccount()
  const { disconnect } = useDisconnect();
  const { connect, isConnecting } = useConnectUI();
  // const { connectors } = useConnectors();
  const info = useChain()
  
  console.log('__info', info)
  

  
  const connectWallet = useCallback(async () => {
      try {
        connect()
      } catch (err) {
        console.log("error connecting: ", err);
        setError('FAILED_TO_CONNECT')
      }
    }, [connect]);

  const disconnectWallet = async () => {
    if (!isConnected) return
    
    disconnect()
    setAccounts([]);
  };

  return (
      <NetworkConnectionContext.Provider value={{ wallet, accounts, accountConnected: account || undefined, 
        isLoading: isLoading || isConnecting, error, connectWallet, disconnectWallet }}>
        {children}
      </NetworkConnectionContext.Provider>
  );
};

