import React from 'react';

import { MdKeyboardArrowRight } from 'react-icons/md';

import styles from './index.module.scss';


type CtaButtonProps = {
  color?: string;
  href?: string;
  width?: string;
  block?: boolean;
  className?: string;
};

const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  className = '',
  width = 'auto',
  color = 'blue',
  block = false,
}) => {
  return (
    <div
      className={`${styles.container} ${color} ${className}`}
      style={{
        width,
        display: block ? 'block' : 'inline-block'
      }}
    >
      <span className={styles.text}>
        {children}
      </span>
      <div className={styles.arrow}>
        <MdKeyboardArrowRight fontSize={22} />
      </div>
    </div>
  );
};

export default CtaButton;
