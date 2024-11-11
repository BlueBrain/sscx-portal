import React, { useState, useEffect } from 'react';
import range from 'lodash/range';
import { captureException } from '@sentry/nextjs';

import { imgOpt } from '../../utils';
import ImageViewer from '../ImageViewer';
import { staticDataBaseUrl } from '../../config';

import style from './styles.module.scss';


const classPrefix = 'synaptome__';

type SynaptomeProps = {
  type: 'pre' | 'post' | 'pathway';
  region: string;
  pathway: string;
  className?: string;
}

const pathwayRe = /^(L\d+.*)\-(L\d+.*)$/;


type MtypeSynaptomeLayerImageProps = {
  src: string;
  layer: string;
  layerPlotNotAvailable?: boolean;
};

const MtypeSynaptomeLayerPlot: React.FC<MtypeSynaptomeLayerImageProps> = ({ src, layer, layerPlotNotAvailable = false }) => {
  return (
    <>
      <div
        style={{ aspectRatio: '5 / 4' }}
        className={layerPlotNotAvailable ? style.layerNotAvailable : undefined}
      >
        {src && !layerPlotNotAvailable && (
          <ImageViewer
            src={src}
            thumbnailSrc={src.replace('.png', '__w640.png')}
            aspectRatio="5 / 4"
          />
        )}

        {layerPlotNotAvailable && (
          <span>No connections</span>
        )}
      </div>
      <div className="text-center">{layer}</div>
    </>
  );
};


const Synaptome: React.FC<SynaptomeProps> = ({ type, region, pathway, className = '' }) => {
  const [mtypeSynaptomeLayers, setMtypeSynaptomeLayers] = useState<string[]>(null);

  const pathwayMatched = pathway.match(pathwayRe);

  const [, preMtype, postMtype] = pathwayMatched;

  const synaptomeMtype = type === 'pre' ? preMtype : postMtype;

  const label = `${type === 'pre' ? 'Pre' : 'Post'}-synaptic Synaptome ${synaptomeMtype}`;
  const synaptomeBaseUrl = `${staticDataBaseUrl}/synaptomes/${region}_Column/${preMtype}__${postMtype}`;

  const mtypeSynaptomeBaseUrl = `${staticDataBaseUrl}/model-data/REGION/${region}/Central/MTypes/${synaptomeMtype}/Synaptome`;

  const layers = range(1, 7).map(layerNum => `L${layerNum}`);

  useEffect(() => {
    if (type === 'pathway') return;

    const subpath = type === 'post' ? 'input' : 'output';
    const mtypeSynaptomeLayersUrl = `${mtypeSynaptomeBaseUrl}/${subpath}_synaptome/io_synaptome_plot_layers.json`;

    fetch(mtypeSynaptomeLayersUrl)
      .then(res => res.json())
      .then(layers => setMtypeSynaptomeLayers(layers))
      .catch(captureException);
  }, [type, region, pathway, mtypeSynaptomeBaseUrl]);

  if (type === 'pathway') {
    return (
      <ImageViewer
        src={`${synaptomeBaseUrl}/${preMtype}_${postMtype}.png`}
        aspectRatio="16 / 9"
      />
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
                <MtypeSynaptomeLayerPlot
                  src={mtypeSynaptomeLayers ? `${mtypeSynaptomeBaseUrl}/input_synaptome/${layer}.png` : null}
                  layer={layer}
                  layerPlotNotAvailable={mtypeSynaptomeLayers && !mtypeSynaptomeLayers.includes(layer)}
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
                <MtypeSynaptomeLayerPlot
                  src={mtypeSynaptomeLayers ? `${mtypeSynaptomeBaseUrl}/output_synaptome/${layer}.png` : null}
                  layer={layer}
                  layerPlotNotAvailable={mtypeSynaptomeLayers && !mtypeSynaptomeLayers.includes(layer)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <ImageViewer
        className="mt-3"
        src={`${synaptomeBaseUrl}/${type === 'pre' ? preMtype : postMtype}.png`}
        thumbnailSrc={`${synaptomeBaseUrl}/${type === 'pre' ? preMtype : postMtype}.png`}
        aspectRatio='16 / 9'
      />
      <small>* For m-type color-coding see the <a href="#mtypeLegend">M-type legend</a></small>
    </div>
  );
};

export default Synaptome;
