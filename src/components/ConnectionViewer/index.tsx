import React from 'react';
import dynamic from 'next/dynamic';

import { ConnectionViewerProps } from './ConnectionViewer';
import styles from './connection-viewer.module.scss';


const ConnectionViewerLazy = dynamic(() => import('./ConnectionViewer'), {
  ssr: false,
  loading: () => (<div className={styles.fixedAspectRatio} />),
});

const ConnectionViewer: React.FC<ConnectionViewerProps> = (props) => {
  return (
    <ConnectionViewerLazy {...props} />
  );
};

export default ConnectionViewer;
