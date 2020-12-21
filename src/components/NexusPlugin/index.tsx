import React, { Suspense } from 'react';

import { NexusPluginClassProps } from './nexus-plugin';


const NexusPluginLazy = React.lazy(() => import('./nexus-plugin'));

const ImageViewer: React.FC<NexusPluginClassProps<any>> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NexusPluginLazy {...props} />
    </Suspense>
  );
};


export default ImageViewer;
