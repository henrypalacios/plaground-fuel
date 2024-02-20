import React, { useEffect, useState } from 'react';
import styles from './BadgeWalletInfo.module.scss';
import { getTruncatedAddress } from '@/utils/blockchain';
import { useGetBalance } from '@/hooks/useGetBalance';
import { planckToDecimalFormatted } from '@/utils/bnJsFormatter';
import { useNetworkConnection } from '@/context/NetworkConnectionConfig/useNetworkConnection';
import { BN } from 'fuels';

interface BadgeWalletInfoProps {
  isConnecting: boolean;
  balanceData?: { value: number; symbol: string };
  address: string;
}

export const BadgeWalletInfo: React.FC<BadgeWalletInfoProps> = ({
  isConnecting,
  address,
}) => {
  // const {balance} = useGetBalance({})
  const [formattedBalance, setFormattedBalance] = useState()
  const {wallet} = useNetworkConnection()

  // const formattedBalance = planckToDecimalFormatted(
  //   balance || undefined, {
  //     significantFigures: 4,
  //   }
  // )
  
  useEffect(() => {
  if (!wallet) return

  wallet.getBalance().then((value) => {
    
    const base = new BN(10).pow(new BN(9));
    const { div, mod } = new BN(value).divmod(base);
  
      console.log(`${div.toString()}.${mod.toString().padStart(9, "0")}`)
    console.log('__', div.toString(), mod.toString(), base.toString())
    // console.log('__', value.toString())
  })
  
    
  }, [wallet])

  return (
    <div className={styles.badgeBoxOval}>
      <div className={`${styles.badgeBoxOval__inner} ${styles["badgeBoxOval__inner--faded"]}`}>
        {isConnecting ? (
          <div className={styles.progress}></div>
        ) : (
          <span className={styles.text}>
            {/* {formatBalance(balanceData?.value.toString() || '')} {balanceData?.symbol} */}
          </span>
        )}
      </div>
      <div className={`${styles.badgeBoxOval__inner} ${styles["badgeBoxOval__inner--highlighted"]}`}>
        <span className={styles.text}>{getTruncatedAddress(address)}</span>
      </div>
    </div>
  );
};
