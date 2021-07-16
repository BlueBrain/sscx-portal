import React from 'react';

import styles from './styles.module.scss';


type PublicationBlockProps = {
  href: string;
  description: string | React.ReactNode;
  authors: string | React.ReactNode;
  className?: string;
};

const PublicationBlock: React.FC<PublicationBlockProps> = ({
  href,
  description,
  authors,
  className = '',
}) => (
  <a
    className={`${styles.container} ${className}`}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <p className={styles.content}>{description}</p>
    <div className={styles.authors}>{authors}</div>
    <div className={styles.arrow} />
  </a>
);

export default PublicationBlock;
