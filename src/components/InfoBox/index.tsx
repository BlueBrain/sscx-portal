import React from 'react';

import styles from './styles.module.scss';


type InfoBoxProps = {
  bgImage?: string;
  className?: string;
};

const InfoBox: React.FC<InfoBoxProps> = ({
  bgImage = '',
  children,
  className = '',
}) => (
  <div className={`${styles.containerOuter} bg-${bgImage} ${className}`}>
    <div className={styles.containerInner}>{children}</div>
    <div className={styles.topGradient} />
    <div className={styles.bottomGradient} />
  </div>
);


export default InfoBox;
