import React from 'react';
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';

import { staticDataBaseUrl } from '@/config';


const images: string[] = new Array(99).fill(0).map((_, idx) => `${staticDataBaseUrl}/exp-data/atlas-volume/volume-w-morphologies/SSXC_IntVideoFrames_V2_${String(idx).padStart(2, '0')}.png`);

const TridiView: React.FC = () => {
  return (
    <Tridi images={images} />
  );
};


export default TridiView;
