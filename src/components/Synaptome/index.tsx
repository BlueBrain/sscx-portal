import React from 'react';

import ImageViewer from '../ImageViewer';
import { basePath } from '../../config';

// import './style.less';


const classPrefix = 'synaptome__';


type SynaptomeProps = {
  type: 'pre' | 'post' | 'pathway';
  region: string;
  pathway: string;
  className?: string;
}

const pathwayRe = /^(L\d+.*)\-(L\d+.*)$/;

const Synaptome: React.FC<SynaptomeProps> = ({ type, region, pathway, className = '' }) => {
  const pathwayMatched = pathway.match(pathwayRe);

  const [, preMtype, postMtype] = pathwayMatched;

  const label = `${type === 'pre' ? 'Pre' : 'Post'}-synaptic Synaptome ${type === 'pre' ? preMtype : postMtype}`;
  const synaptomeBaseUrl = `${basePath}/data/synaptomes/${region}_Column/${preMtype}___${postMtype}`;
  const mtypeSynaptomeBaseUrl = `${basePath}/data/model-data/REGION/${region}/Central/MTypes/${type === 'pre' ? preMtype : postMtype}/Synaptome`;

  if (type === 'pathway') {
    return (
      <ImageViewer src={`${synaptomeBaseUrl}/${preMtype}_${postMtype}.png`} />
    );
  }

  return (
    <div className={`${classPrefix}basis ${className}`}>
      <h3>{label}</h3>
      <div className="row middle-sm">
        <div className="col-xs-6 col-sm-1">
          <ImageViewer src={`${mtypeSynaptomeBaseUrl}/input_synaptome.png`} />
        </div>
        <div className="col-xs-6 col-sm-1">
          <ImageViewer src={`${mtypeSynaptomeBaseUrl}/output_synaptome.png`} />
        </div>
        <div className="col-xs-12 col-sm-10">
          <h2>Synapses</h2>
          <ImageViewer src={`${synaptomeBaseUrl}/${type === 'pre' ? preMtype : postMtype}.png`} />
        </div>
      </div>
    </div>
  );
};

export default Synaptome;
