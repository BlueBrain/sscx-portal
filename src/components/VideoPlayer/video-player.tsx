import React, { useRef, useEffect, useState } from 'react';
import Plyr from 'plyr';

import 'plyr/dist/plyr.css';


const Video: React.FC<any> = (props) => {
  const videoRef = useRef(null);
  const [videoPlayer, setVideoPlayer] = useState(null);

  useEffect(() => {
    console.log('Init video player');
    const player = new Plyr(videoRef.current, {
      settings: ['quality', 'loop'],
      controls: ['play', 'progress', 'settings', 'pip', 'airplay', 'fullscreen'],
      autoplay: true,
      muted: true,
      loop: {
        active: true,
      },
    });
    player.source = {
      type: 'video',
      sources: [{
        src: props.src || 'http://bbp.epfl.ch/project/media/nmc-portal/Synaptome/mp4/L1_NGC-DA.mp4',
        type: 'video/mp4',
        size: 720
      }, {
        src: props.src || 'http://bbp.epfl.ch/project/media/nmc-portal/Synaptome/mp4/L1_NGC-DA.mp4',
        type: 'video/mp4',
        size: 1080
      }]
    };
    setVideoPlayer(player);

    return () => {
      if (videoPlayer) {
        videoPlayer.destroy();
      }
    }
  }, []);

  return (
    <video className="js-plyr plyr" ref={videoRef} />
  );
};

export default Video;
