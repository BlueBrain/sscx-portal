import React, { Suspense } from 'react';


const VideoPlayerLazy = React.lazy(() => import('./video-player'));

const VideoPlayer: React.FC<any> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoPlayerLazy {...props} />
    </Suspense>
  );
};


export default VideoPlayer;
