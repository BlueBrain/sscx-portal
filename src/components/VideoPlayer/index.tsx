import React from 'react';
import dynamic from 'next/dynamic';

import { staticDataBaseUrl} from '@/config';
import { VideoProps, defaultVideoSizes } from './video-player';


const codecVideoType = {
  h264: 'video/mp4',
  hevc: 'video/mp4; codecs=hvc1',
  av1: 'video/mp4; codecs="av01.0.05M.08"; profiles="isom,av01,iso2,mp41"',
};

// h264 should come last as the most supported and less efficient codec so it will be used only if
// no other options are supported
const defaultCodecs = ['av1', 'hevc', 'h264'];

export function composeSources(videoBasePath, sizes = defaultVideoSizes, codecs = defaultCodecs) {
  return sizes
    .reduce((acc, size) => ([...acc, ...codecs.map(codec => ([size, codec]))]), [])
    .map(([size, codec]) => ({
      size,
      src: `${staticDataBaseUrl}${videoBasePath}.${size}p.${codec}.mp4`,
      type: codecVideoType[codec],
    }));
}

const VideoPlayerLazy = dynamic(() => import('./video-player'), { ssr: false });

const VideoPlayer: React.FC<VideoProps> = (props) => {
  return (
    <VideoPlayerLazy {...props} />
  );
};


export default VideoPlayer;
