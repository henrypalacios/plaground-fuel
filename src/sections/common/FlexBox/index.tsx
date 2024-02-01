import React from 'react';
import styles from './FlexBox.module.scss';

interface FlexBoxProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
}

export const FlexBox: React.FC<FlexBoxProps> = ({ children, direction = 'row' }) => {
  const directionClassName = direction === 'row' ? styles["flexBox--row"] : styles["flexBox--column"];
  return <div className={`${styles.flexBox} ${directionClassName}`}>{children}</div>;
};
