import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

type NetworkConnectionError = 'FAILED_TO_CONNECT' | 'WALLET_NOT_DETECTED'

interface NetworkConnectionContextType {
  isConnected: boolean;
  isLoading: boolean;
  accounts: string[];
  error: NetworkConnectionError | undefined;
  accountConnected: string | undefined;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const NetworkConnectionContext = createContext<NetworkConnectionContextType | undefined>(undefined);

interface NetworkConnectionProviderProps {
  children: ReactNode;
}

export const NetworkConnectionProvider: React.FC<NetworkConnectionProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<NetworkConnectionContextType['error']>();
  const [accounts, setAccounts] = useState<NetworkConnectionContextType['accounts']>([]);
  const [accountConnected, setAccountConnected] = useState<NetworkConnectionContextType['accountConnected']>();
  
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
  
  async function checkConnection() {
    if (window.fuel) {
      const isConnected = await window.fuel.isConnected();
      if (isConnected) {
        const accounts = await window.fuel.accounts();
        setAccounts(accounts);
        accounts.length && setAccountConnected(accounts[0]);
        setIsConnected(true);
      }
    }
  }

  const connectWallet = useCallback(async () => {
      if (!window.fuel) return

      try {
        setIsLoading(true)
        await window.fuel.connect();
        const accounts = await window.fuel.accounts();
        setAccounts(accounts);
        accounts.length && setAccountConnected(accounts[0]);
        setIsConnected(true);
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
    setIsConnected(false);
  };

  return (
    <NetworkConnectionContext.Provider value={{ isConnected, accounts, accountConnected, isLoading, error, connectWallet, disconnectWallet }}>
      {children}
    </NetworkConnectionContext.Provider>
  );
};

export const useNetworkConnection = () => {
  const context = useContext(NetworkConnectionContext);
  if (context === undefined) {
    throw new Error('useNetworkConnection must be used within a NetworkConnectionProvider');
  }
  return context;
};
