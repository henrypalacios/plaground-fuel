import styles from './BadgeWalletInfo.module.scss';
import { getTruncatedAddress } from '@/utils/blockchain';

interface BadgeWalletInfoProps {
  isLoading: boolean;
  balanceData?: string | undefined;
  address: string;
}

export const BadgeWalletInfo: React.FC<BadgeWalletInfoProps> = ({
  address,
  balanceData,
  isLoading
}) => {

  return (
    <div className={styles.badgeOval}>
      <div className={`${styles['badgeOval']} ${styles['badgeOval--fill']}`}>
        <div className={`${styles['badgeOval']} ${styles['badgeOval--fill']}`}>
          {isLoading ? (
            <div className={styles.progress}></div>
          ) : (
            <span className={styles.text}>
            {balanceData || '-'}
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
