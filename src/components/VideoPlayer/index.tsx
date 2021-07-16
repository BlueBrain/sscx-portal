import React from 'react';
import dynamic from 'next/dynamic';


const VideoPlayerLazy = dynamic(() => import('./video-player'), { ssr: false });

const VideoPlayer: React.FC<any> = (props) => (
  <VideoPlayerLazy {...props} />
);


export default VideoPlayer;
