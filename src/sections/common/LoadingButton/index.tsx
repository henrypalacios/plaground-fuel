import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from  './LoadingButton.module.scss';
import { classNames } from '@/utils/classNames';

export interface LoadingButtonProps  extends ButtonHTMLAttributes<HTMLButtonElement & PropsWithChildren>{
    isLoading?: boolean;
    variant?: string
}

function LoadingButton({ isLoading = false, children, onClick, variant = undefined, ...props }: LoadingButtonProps) {
  return (
    <div className={styles["walletConnect__container"]}>
      <button
        className={classNames(styles[`walletConnect__button`], variant ? styles[`walletConnect__button--danger`]: '')}
        onClick={onClick}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className={styles["spinner"]}></div>
        ) : (
          children
        )}
      </button>
    </div>
  );
}

export default LoadingButton;
