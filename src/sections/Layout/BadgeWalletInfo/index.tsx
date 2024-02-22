import { PropsWithChildren } from 'react';
import { classNames } from '@/utils/classNames';
import styles from './BadgeWalletInfo.module.scss';
import { getTruncatedAddress } from '@/utils/blockchain';
import { FlexBox } from '@/sections/common/FlexBox';

interface BadgeWalletInfoProps extends PropsWithChildren {
  isLoading: boolean;
  balanceData?: string | undefined;
  address: string;
  color?: 'default' | 'secondary';
}

export const BadgeWalletInfo: React.FC<BadgeWalletInfoProps> = ({
  address,
  balanceData,
  isLoading,
  color,
  children
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
        <FlexBox>
          <span className={classNames(styles.text, textColorStyle)}>{getTruncatedAddress(address)}</span>
          {children ? <span>{children}</span> : null}
        </FlexBox>
      </div>
    </div>
  );
};
