import React, { useEffect, useState } from 'react';

import { morphHistogramIndexPath, morphHistogramImgPath } from '../../queries/http';
import ImageViewer from '../ImageViewer';


type MorphHistogramProps = {
  region: string;
  mtype: string;
  className?: string;
};

const MorphHistogram: React.FC<MorphHistogramProps> = ({ region, mtype, className = '' }) => {
  const [histogramList, setHistogramList] = useState<string[]>([]);

  const histograms = {};
  histogramList.sort().forEach(histogramName => {
    const [, histType, neuriteType] = histogramName.match(/(.+)\-(.+)/);
    if (!histograms[neuriteType]) {
      histograms[neuriteType] = [histType];
    } else {
      histograms[neuriteType].push(histType);
    }
  });

  const neuriteTypes = Object.keys(histograms).sort();

  const axonType = neuriteTypes.filter(type => type.match(/axon/i))[0];
  const dendriteTypes = neuriteTypes.filter(type => !type.match(/axon/i));

  useEffect(() => {
    if (!region || !mtype) return;

    fetch(morphHistogramIndexPath(region, mtype))
      .then(res => res.json())
      .then(histogramIndex => setHistogramList(histogramIndex));
  }, [region, mtype]);

  const dendriteDistributionLabel = (dendriteType) => {
    if (dendriteType.includes('basal')) return 'Basal';
    if (dendriteType.includes('apical')) return 'Apical';

    return 'Dendritic';
  };

  return (
    <div id="morphHistogram" className={className}>
      {axonType && (
        <>
          <h4>Axonal distributions</h4>
          <div className="row">
            {histograms[axonType].map(histogramType => (
              <div
                key={histogramType}
                className="col-xs-6 col-md-3"
              >
                <ImageViewer
                  thumbnailSrc={morphHistogramImgPath(region, mtype, histogramType, axonType).replace('.png', '__w640.png')}
                  src={morphHistogramImgPath(region, mtype, histogramType, axonType)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {dendriteTypes.map(dendriteType => (
        <div key={dendriteType}>
          <h4 className="mt-3">
            {dendriteDistributionLabel(dendriteType)} distributions
          </h4>
          <div className="row">
            {histograms[dendriteType].map(histogramType => (
              <div
                key={histogramType}
                className="col-xs-6 col-md-3"
              >
                <ImageViewer
                  thumbnailSrc={morphHistogramImgPath(region, mtype, histogramType, dendriteType).replace('.png', '__w640.png')}
                  src={morphHistogramImgPath(region, mtype, histogramType, dendriteType)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default MorphHistogram;
