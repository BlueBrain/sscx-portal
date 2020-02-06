import React from 'react';

import './style.less';
import { FaExpandArrowsAlt, IoMdDownload } from 'react-icons/all';

const classPrefix = 'image-viewer__';

type ImageViewerProps = {
  src: string;
  alt?: string;
  canDownload?: boolean;
  canExpand?: boolean;
};

const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt,
  canDownload = true,
  canExpand = true,
}) => {
  return (
    <div className={`${classPrefix}basis`}>
      <img src={src} alt={alt} />
      {canExpand && (
        <a href={src} className="icon-button__expand">
          <FaExpandArrowsAlt />
        </a>
      )}
      {canDownload && (
        <button className="icon-button__download">
          <IoMdDownload />
        </button>
      )}
    </div>
  );
};

export default ImageViewer;
