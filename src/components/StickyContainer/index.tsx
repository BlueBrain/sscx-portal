import { FC } from 'react';
import styles from './styles.module.scss';

interface StickyContainerProps {

}

const StickyContainer: FC<StickyContainerProps> = ({ children }) => (
  <div className={styles.flexWrapper}>
    <div className={styles.container}>
      {children}
    </div>
  </div>
);

export { StickyContainer };
