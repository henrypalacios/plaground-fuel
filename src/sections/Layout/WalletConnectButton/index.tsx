import { FlexBox } from '@/sections/common/FlexBox';
import { BadgeWalletInfo } from '../BadgeWalletInfo';
import { useNetworkConnection } from '@/context/NetworkConnectionConfig/useNetworkConnection';
import LoadingButton from '@/sections/common/LoadingButton';
import { useGetBalance } from '@/hooks/useGetBalance';
import CopyButton from '@/sections/common/CopyButton';

export const WalletConnectButton = () => {
  const { wallet, connectWallet, isLoading, accountConnected, disconnectWallet } = useNetworkConnection();
  const {formatted, isLoading: isLoadingBalance} = useGetBalance()

  const buttonProps = wallet ? { variant:`danger`, onClick:() => disconnectWallet() }:
            {onClick: () => {
                connectWallet()
            }
          }      


  return (
      <FlexBox>
        {accountConnected && 
          <BadgeWalletInfo isLoading={isLoadingBalance} address={accountConnected} balanceData={formatted}>
            <FlexBox>
              <CopyButton textToCopy={wallet?.address.toAddress() || ''} /> 
            </FlexBox>
          </BadgeWalletInfo>
        }
        <LoadingButton isLoading={isLoading} {...buttonProps}>
          {wallet ? `Disconnect` : `Connect to wallet`}
        </LoadingButton>
      </FlexBox>
  );
};
