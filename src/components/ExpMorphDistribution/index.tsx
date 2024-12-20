import React, { useEffect, useState } from 'react';

import { expMorphPopulationPlotIndexPath, expMorphPopulationPlotPath } from '../../queries/http';
import ImageViewer from '../ImageViewer';


type ExpMorphDistributionProps = {
  mtype: string;
  className?: string;
};

type PlotObj = {
  name: string;
  src: string;
  thumbnailSrc?: string;
};

const neuriteTypeByName = (plot) => {
  if (plot.includes('axon')) return 'axon';

  if (plot.includes('dendrite')) return 'dendrite';
  if (plot.includes('basal')) return 'basal';
  if (plot.includes('apical')) return 'apical';

  if (plot.includes('soma')) return 'soma';
};

const thumbnailSrcSuffix = '__w640';

const ExpMorphDistribution: React.FC<ExpMorphDistributionProps> = ({ mtype, className = '' }) => {
  const [plotList, setPlotList] = useState<string[]>([]);

  const plots: Record<string, PlotObj[]> = {};
  plotList.sort().forEach(plotName => {
    const neuriteType = neuriteTypeByName(plotName);

    const src = expMorphPopulationPlotPath(mtype, plotName);
    const thumbnailSrc = src.replace('.png', `${thumbnailSrcSuffix}.png`);

    const plotObj = {
      name: plotName,
      src,
      thumbnailSrc,
    };

    if (!plots[neuriteType]) {
      plots[neuriteType] = [plotObj];
    } else {
      plots[neuriteType].push(plotObj);
    }
  });

  const neuriteTypes = Object.keys(plots).sort();

  const dendriteTypes = neuriteTypes.filter(type => type.match(/apical|basal|dendr/i));

  useEffect(() => {
    if (!mtype) return;

    fetch(expMorphPopulationPlotIndexPath(mtype))
      .then(res => res.json())
      .then(histogramIndex => setPlotList(histogramIndex.plots));
  }, [mtype]);

  const dendriteDistributionLabel = (dendriteType) => {
    if (dendriteType.includes('basal')) return 'Basal';
    if (dendriteType.includes('apical')) return 'Apical';

    return 'Dendritic';
  };

  return (
    <div id="morphHistogram" className={className}>
      {neuriteTypes.includes('axon') && (
        <>
          <h4>Axonal distributions</h4>
          <div className="row">
            {plots.axon.map(plotObj => (
              <div
                key={plotObj.name}
                className="col-xs-6 col-sm-4 col-md-3"
              >
                <ImageViewer
                  thumbnailSrc={plotObj.thumbnailSrc}
                  src={plotObj.src}
                  aspectRatio="4 / 3"
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
          <div className="row mb-3">
            {plots[dendriteType].map(plotObj => (
              <div
                key={plotObj.name}
                className="col-xs-6 col-sm-4 col-md-3"
              >
                <ImageViewer
                  thumbnailSrc={plotObj.thumbnailSrc}
                  src={plotObj.src}
                  aspectRatio="4 / 3"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {neuriteTypes.includes('soma') && (
        <>
          <h4>Somatic distributions</h4>
          <div className="row">
            {plots.soma.map(plotObj => (
              <div
                key={plotObj.name}
                className="col-xs-6 col-sm-4 col-md-3"
              >
                <ImageViewer
                  thumbnailSrc={plotObj.thumbnailSrc}
                  src={plotObj.src}
                  aspectRatio="4 / 3"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default ExpMorphDistribution;
