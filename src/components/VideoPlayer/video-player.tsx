import React, { useRef, useEffect, useState } from 'react';
import Plyr from 'plyr';

import 'plyr/dist/plyr.css';

type VideoSource = {
  src: string;
  type?: string;
  size?: number;
};

type VideoProps = {
  sources: VideoSource[];
};


const Video: React.FC<VideoProps> = ({ sources = [] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayer, setVideoPlayer] = useState<Plyr | null>(null);

  useEffect(() => {
    if (!videoRef?.current) return;

    const player = new Plyr(videoRef?.current, {
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
      sources,
    };
    setVideoPlayer(player);

    return () => {
      if (!!videoPlayer) {
        videoPlayer.destroy();
      }
    }
  }, [videoRef]);

  return (
    <video className="js-plyr plyr" ref={videoRef} />
  );
};

export default Video;
