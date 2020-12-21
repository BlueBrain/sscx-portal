import React, { Suspense } from 'react';

import { ImageViewerProps } from './image-viewer';


const ImageViewerLazy = React.lazy(() => import('./image-viewer'));

const ImageViewer: React.FC<ImageViewerProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageViewerLazy {...props} />
    </Suspense>
  );
};


export default ImageViewer;
