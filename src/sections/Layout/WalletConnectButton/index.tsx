import { FlexBox } from '@/sections/common/FlexBox';
import { BadgeWalletInfo } from '../BadgeWalletInfo';
import { useNetworkConnection } from '@/context/NetworkConnectionConfig/useNetworkConnection';
import LoadingButton from '@/sections/common/LoadingButton';

export const WalletConnectButton = () => {
  const { wallet, connectWallet, isLoading, accountConnected, disconnectWallet } = useNetworkConnection();

  const buttonProps = wallet ? { variant:`danger`, onClick:() => disconnectWallet() }:
            {onClick: () => connectWallet()}      


  return (
      <FlexBox>
        {accountConnected &&  <BadgeWalletInfo isConnecting={isLoading} address={accountConnected} />}
        <LoadingButton isLoading={isLoading} {...buttonProps}>
          {wallet ? `Disconnect` : `Connect to wallet`}
        </LoadingButton>
      </FlexBox>
  );
};
