import React, { useState, useEffect } from 'react';
import range from 'lodash/range';

import { imgOpt } from '../../utils';
import ImageViewer from '../ImageViewer';
import { staticDataBaseUrl } from '../../config';


const classPrefix = 'synaptome__';

type SynaptomeProps = {
  type: 'pre' | 'post' | 'pathway';
  region: string;
  pathway: string;
  className?: string;
}

const pathwayRe = /^(L\d+.*)\-(L\d+.*)$/;


const MtypeSynaptomeLayerImage = ({ src, layer }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [src]);

  return (
    <>
      <ImageViewer
        src={src}
        thumbnailSrc={src.replace('.png', '__w640.png')}
        aspectRatio="5 / 4"
        onThumbnailLoad={() => setImageLoaded(true)}
      />
      <div className="text-center">{imageLoaded ? layer : ''} &nbsp;</div>
    </>
  );
};


const Synaptome: React.FC<SynaptomeProps> = ({ type, region, pathway, className = '' }) => {
  const pathwayMatched = pathway.match(pathwayRe);

  const [, preMtype, postMtype] = pathwayMatched;

  const synaptomeMtype = type === 'pre' ? preMtype : postMtype;

  const label = `${type === 'pre' ? 'Pre' : 'Post'}-synaptic Synaptome ${synaptomeMtype}`;
  const synaptomeBaseUrl = `${staticDataBaseUrl}/synaptomes/${region}_Column/${preMtype}__${postMtype}`;

  const mtypeSynaptomeBaseUrl = `${staticDataBaseUrl}/model-data/REGION/${region}/Central/MTypes/${synaptomeMtype}/Synaptome`;

  const layers = range(1, 7).map(layerNum => `L${layerNum}`);

  if (type === 'pathway') {
    return (
      <ImageViewer src={`${synaptomeBaseUrl}/${preMtype}_${postMtype}.png`} />
    );
  }

  return (
    <div className={`${classPrefix}basis ${className}`}>
      <h3>{label}</h3>

      {type === 'post' && (
        <div className="mt-3">
          <h4>Input synaptome {synaptomeMtype}</h4>
          <div className="row middle-sm">
            {layers.map(layer => (
              <div className="col-xs-6 col-sm-2 mt-1" key={layer}>
                <MtypeSynaptomeLayerImage
                  src={`${mtypeSynaptomeBaseUrl}/input_synaptome/${layer}.png`}
                  layer={layer}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'pre' && (
        <div className="mt-3">
          <h4>Output synaptome {synaptomeMtype}</h4>
          <div className="row middle-sm">
            {layers.map(layer => (
              <div className="col-xs-6 col-sm-2 mt-1" key={layer}>
                <MtypeSynaptomeLayerImage
                  src={`${mtypeSynaptomeBaseUrl}/output_synaptome/${layer}.png`}
                  layer={layer}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <ImageViewer
        className="mt-3"
        src={`${synaptomeBaseUrl}/${type === 'pre' ? preMtype : postMtype}.png`}
        thumbnailSrc={imgOpt(`${synaptomeBaseUrl}/${type === 'pre' ? preMtype : postMtype}.png`, { width: 1200 })}
        aspectRatio='16 / 9'
      />
      <small>* For m-type color-coding see the <a href="#mtypeLegend">M-type legend</a></small>
    </div>
  );
};

export default Synaptome;
