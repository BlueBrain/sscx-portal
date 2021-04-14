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
  href = null,
  block = false,
}) => {
  return (
    <a
      className={`${styles.container} ${color} ${className}`}
      href={href}
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
    </a>
  );
};

export default CtaButton;
