import React, { useEffect, useState } from 'react';

import { expMorphPopulationPlotIndexPath, expMorphPopulationPlotPath } from '../../queries/http';
import ImageViewer from '../ImageViewer';


type ExpMorphDistributionProps = {
  mtype: string;
  className?: string;
};

const neuriteTypeByName = (plot) => {
  if (plot.includes('axon')) return 'axon';

  if (plot.includes('dendrite')) return 'dendrite';
  if (plot.includes('basal')) return 'basal';
  if (plot.includes('apical')) return 'apical';

  if (plot.includes('soma')) return 'soma';
};

const ExpMorphDistribution: React.FC<ExpMorphDistributionProps> = ({ mtype, className = '' }) => {
  const [plotList, setPlotList] = useState<string[]>([]);

  const plots: Record<string, string[]> = {};
  plotList.sort().forEach(plotName => {
    const neuriteType = neuriteTypeByName(plotName);

    if (!plots[neuriteType]) {
      plots[neuriteType] = [plotName];
    } else {
      plots[neuriteType].push(plotName);
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
            {plots.axon.map(plotName => (
              <div
                key={plotName}
                className="col-xs-12 col-sm-6 col-md-3"
              >
                <ImageViewer
                  // thumbnailSrc={expMorphPopulationPlotPath(mtype, plotName).replace('.png', '__w640.png')}
                  src={expMorphPopulationPlotPath(mtype, plotName)}
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
            {plots[dendriteType].map(plotName => (
              <div
                key={plotName}
                className="col-xs-12 col-sm-6 col-md-3"
              >
                <ImageViewer
                  // thumbnailSrc={expMorphPopulationPlotPath(mtype, plotName).replace('.png', '__w640.png')}
                  src={expMorphPopulationPlotPath(mtype, plotName)}
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
            {plots.soma.map(plotName => (
              <div
                key={plotName}
                className="col-xs-12 col-sm-6 col-md-3"
              >
                <ImageViewer
                  // thumbnailSrc={expMorphPopulationPlotPath(mtype, plotName).replace('.png', '__w640.png')}
                  src={expMorphPopulationPlotPath(mtype, plotName)}
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
