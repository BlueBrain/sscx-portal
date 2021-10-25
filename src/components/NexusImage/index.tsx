import React from 'react';
import dynamic from 'next/dynamic';

import { NexusImageContainerProps } from './NexusImage';


const NexusImageLazy = dynamic(() => import('./NexusImage'), { ssr: false });

const NexusImage: React.FC<NexusImageContainerProps> = (props) => {
  return (
    <NexusImageLazy {...props} />
  );
};


export default NexusImage;
