import React from 'react';
import styles from './FlexBox.module.scss';

interface FlexBoxProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  pt?: 'tiny' | 'sm' | 'lg' 
  gap?: 'tiny' | 'sm' | 'lg' 
  isLoading?: boolean
  align?: 'space-between'
  outline?: boolean
  center?: boolean
}

export const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  direction = 'row',
  pt,
  gap,
  isLoading,
  align,
  outline = false,
  center = false,
}) => {
  const directionClassName = direction === 'row' ? styles["flexBox--row"] : styles["flexBox--column"];
  const paddingTop = pt ? styles[`flexBox__pt--${pt}`] : '' 
  const gapSpace = gap ? styles[`flexBox__gap--${gap}`] : '' 
  const alignStyle = align ? styles[`flexBox--${align}`] : '' 
  const outlineStyle = outline ? styles[`flexBox--outline`] : ''   
  const centerStyle = center ? styles[`flexBox--center`] : ''   

  return (
    <div className={`${styles.flexBox} ${directionClassName} ${paddingTop} 
      ${gapSpace} ${alignStyle} ${outlineStyle} ${centerStyle}`}>
      {isLoading ? (
        <div className={styles["spinner"]}></div>
        ) : (
          children
        )}
    </div>
  )
};
