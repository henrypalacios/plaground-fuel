import React, { PropsWithChildren } from 'react';
import styles from './IconButton.module.scss';

interface IconButtonProps extends PropsWithChildren {
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
