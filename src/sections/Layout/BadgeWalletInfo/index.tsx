import { classNames } from '@/utils/classNames';
import styles from './BadgeWalletInfo.module.scss';
import { getTruncatedAddress } from '@/utils/blockchain';

interface BadgeWalletInfoProps {
  isLoading: boolean;
  balanceData?: string | undefined;
  address: string;
  color?: 'default' | 'secondary';
}

export const BadgeWalletInfo: React.FC<BadgeWalletInfoProps> = ({
  address,
  balanceData,
  isLoading,
  color
}) => {
  const BadgeColorStyle = color ? styles['badgeOval--secondary'] : '' 
  const fillColorStyle = color ? styles['badgeOval__fill--secondary'] :'' 
  const textColorStyle = color ? styles['text--secondary'] :'' 

  return (
    <div className={classNames(styles.badgeOval, BadgeColorStyle)}>
      <div className={`${styles['badgeOval']} ${styles['badgeOval__fill']} ${fillColorStyle}`}>
        <div className={`${styles['badgeOval']} ${styles['badgeOval__fill']} ${fillColorStyle}`}>
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
        <span className={classNames(styles.text, textColorStyle)}>{getTruncatedAddress(address)}</span>
      </div>
    </div>
  );
};
