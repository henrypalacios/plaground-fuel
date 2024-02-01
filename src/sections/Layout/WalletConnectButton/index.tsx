import { FlexBox } from '@/sections/common/FlexBox';
import { BadgeWalletInfo } from '../BadgeWalletInfo';
import styles from './WalletConnectButton.module.scss';
import { useNetworkConnection } from '@/context/useNetworkConnection';

export const WalletConnectButton = () => {
  const { wallet, connectWallet, isLoading, accountConnected, disconnectWallet } = useNetworkConnection();

  if (wallet) {
    return (
      <FlexBox>
      {accountConnected && 
        <BadgeWalletInfo isConnecting={isLoading} address={accountConnected} />}
      <button
        className={`${styles.walletConnect__button} ${styles['walletConnect__button--disconnect']}`}
        onClick={() => disconnectWallet()}
      >
        Disconnect
      </button>
      </FlexBox>
    );
  }

  return (
    <div className={styles.walletConnect__container}>
      <button
        className={styles.walletConnect__button}
        onClick={() => connectWallet()}
      >
        Connect to wallet
      </button>
    </div>
  );
};
