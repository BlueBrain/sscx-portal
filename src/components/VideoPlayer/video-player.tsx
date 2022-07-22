import React, { useRef, useEffect, useState } from 'react';
import Plyr from 'plyr';

import 'plyr/dist/plyr.css';

type VideoSource = {
  src: string;
  type?: string;
  size?: number;
};

export type VideoProps = {
  sources: VideoSource[];
  loop?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  defaultSize?: number;
  ratio?: string;
  poster?: string;
};

export const defaultVideoSizes = [360, 480, 720, 1080, 2160];


const Video: React.FC<VideoProps> = ({
  sources = [],
  loop = false,
  autoplay = false,
  muted = false,
  defaultSize = 480,
  ratio = '16:9',
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayer, setVideoPlayer] = useState<Plyr | null>(null);

  useEffect(() => {
    if (!videoRef?.current) return;

    const player = new Plyr(videoRef?.current, {
      settings: ['quality', 'loop'],
      storage: {
        enabled: false,
      },
      ratio,
      controls: ['play', 'progress', 'settings', 'pip', 'airplay', 'fullscreen'],
      quality: {
        default: defaultSize,
        options: defaultVideoSizes,
      },
      autoplay,
      muted,
      loop: {
        active: loop,
      },
    });

    player.source = {
      type: 'video',
      sources,
      poster,
    };

    setVideoPlayer(player);

    return () => {
      if (!!videoPlayer) {
        videoPlayer.destroy();
      }
    }
  }, [videoRef, autoplay, ratio, defaultSize, muted, loop, sources, poster]);

  return (
    <div>
      <video className="js-plyr plyr" ref={videoRef} />
    </div>
  );
};

export default Video;
