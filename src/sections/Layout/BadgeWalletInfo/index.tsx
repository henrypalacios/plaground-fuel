import styles from './BadgeWalletInfo.module.scss';
import { getTruncatedAddress } from '@/utils/blockchain';
import { useGetBalance } from '@/hooks/useGetBalance';

interface BadgeWalletInfoProps {
  isConnecting: boolean;
  balanceData?: { value: number; symbol: string };
  address: string;
}

export const BadgeWalletInfo: React.FC<BadgeWalletInfoProps> = ({
  address,
}) => {
  const {formatted, isLoading} = useGetBalance()

  return (
    <div className={styles.badgeOval}>
      <div className={`${styles['badgeOval']} ${styles['badgeOval--fill']}`}>
        <div className={`${styles['badgeOval']} ${styles['badgeOval--fill']}`}>
          {isLoading ? (
            <div className={styles.progress}></div>
          ) : (
            <span className={styles.text}>
            {formatted || '-'}
            </span>
          )}
        </div>
      </div>
      <div className={`${styles["badgeOval__inner--highlighted"]}`}>
        <span className={styles.text}>{getTruncatedAddress(address)}</span>
      </div>
    </div>
  );
};
