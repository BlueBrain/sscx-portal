import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import { useNexusContext } from '@bbp/react-nexus';

import { parseUrl } from '../../utils';

import 'react-image-lightbox/style.css';


const classPrefix = 'nexus-image__';

export type NexusImageContainerProps = {
  imageUrl: string; // nexus selfUrl, if org ond project will be treated as nexus id
  org?: string;
  project?: string;
  aspectRatio?: string;
  border?: boolean;
  alt?: string;
};

type NexusImageProps = {
  imageData: any;
  alt?: string;
  border?: boolean;
}

export const NexusImageComponent = (props: NexusImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<string>();

  useEffect(() => {
    const data = URL.createObjectURL(props.imageData);
    setData(data);
    return () => URL.revokeObjectURL(data);
  }, [props.imageData]);

  const handleClick = (e: React.MouseEvent) => {
    setIsOpen(true);
    e.stopPropagation();
  };

  return data ? (
    <>
      {isOpen && (
        <Lightbox mainSrc={data} onCloseRequest={() => setIsOpen(false)} />
      )}
      <div
        className={`nexus-image-container ${props.border ? 'border' : ''}`}
        onClick={handleClick}
      >
        <img src={data} alt={props.alt} />
      </div>
    </>
  ) : null;
};

export const NexusImage = (props: NexusImageContainerProps) => {
  const { imageUrl, org, project, aspectRatio, border, alt } = props;

  const nexus = useNexusContext();

  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<string | null>(null);

  const { org: imageOrg, project: imageProject } =
    org && project ? { org, project } : parseUrl(imageUrl);

  useEffect(() => {
    // TODO: We can implement a caching layer here based on file revision
    nexus.File.get(imageOrg, imageProject, encodeURIComponent(imageUrl), {
      as: 'blob',
    })
      .then(imageData => setImageData(imageData as string))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`${classPrefix}basis`} style={{ aspectRatio }}>
      {/* {loading && (
        <Spin spinning={loading}>
          <div className="nexus-image-container">
            <Skeleton.Image />
          </div>
        </Spin>
      )} */}
      {imageData && <NexusImageComponent imageData={imageData} alt={alt} />}
    </div>
  );
};

export default NexusImage;
