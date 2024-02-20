import { useNetworkConnection } from '@/context/NetworkConnectionConfig/useNetworkConnection';
import { useBalance } from '@fuel-wallet/react';
import { BN } from 'fuels';

interface AssetInfo {
    assetId?: string;
    assetSymbol?: string;
}

interface Props {
    assetInfo?: AssetInfo;
}

interface UseGetBalanceReturn extends Props {
    balance: BN | null 
}
    

export function useGetBalance({assetInfo}: Props): UseGetBalanceReturn  {
    const {accountConnected} = useNetworkConnection()
    const {balance} = useBalance({address: accountConnected}) 

    return {balance, assetInfo: {...assetInfo, assetSymbol: assetInfo?.assetId ? assetInfo.assetSymbol : 'ETH'}}
}