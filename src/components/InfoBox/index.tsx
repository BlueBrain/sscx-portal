import React from 'react';

import styles from './styles.module.scss';


type InfoBoxProps = {
  bgImage?: string
};

const InfoBox: React.FC<InfoBoxProps> = ({
  bgImage = '',
  children,
}) => {
  return (
    <div className={`${styles.containerOuter} bg-${bgImage}`}>
      <div className={styles.containerInner}>{children}</div>
      <div className={styles.topGradient}></div>
      <div className={styles.bottomGradient}></div>
    </div>
  );
};


export default InfoBox;
