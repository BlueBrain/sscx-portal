import React from 'react';
import { useNexusContext } from '@bbp/react-nexus';
import { sscx } from '../../config';

type VideoProps = {
  id: string;
  width?: number;
};

const Video: React.FC<VideoProps> = ({ id, width = 350 }) => {
  const [video, setVideo] = React.useState<Blob | undefined>(undefined);
  const [error, setError] = React.useState<boolean>(false);
  const nexus = useNexusContext();

  React.useEffect(() => {
    nexus.File.get(sscx.org, sscx.project, id, {
      as: 'blob',
    })
      .then(v => setVideo(v as Blob))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p>error loading video</p>;
  }

  if (!video) {
    return <p>loading...</p>;
  }

  const url = URL.createObjectURL(video);

  return <video src={url} autoPlay loop muted width={width} controls />;
};

export default Video;
