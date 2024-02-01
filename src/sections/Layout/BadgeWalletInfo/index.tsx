import React from 'react';
import styles from './BadgeWalletInfo.module.scss';
import { getTruncatedAddress } from '@/utils/blockchain';

interface BadgeWalletInfoProps {
  isConnecting: boolean;
  balanceData?: { value: number; symbol: string };
  address: string;
}

export const BadgeWalletInfo: React.FC<BadgeWalletInfoProps> = ({
  isConnecting,
  address,
}) => {
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
