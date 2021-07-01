import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';

import { expEphysPopulationPlotIndexPath, expEphysPopulationPlotPath } from '../../queries/http';
import ImageViewer from '../ImageViewer';


const { Panel } = Collapse;


type ExpEphysDistributionProps = {
  etype: string;
  className?: string;
};

const ExpEphysDistribution: React.FC<ExpEphysDistributionProps> = ({ etype, className = '' }) => {
  const [plotIndex, setPlotIndex] = useState<Record<string, string[]>>({});

  const protocols = Object.keys(plotIndex).sort();

  useEffect(() => {
    if (!etype) return;

    fetch(expEphysPopulationPlotIndexPath(etype))
      .then(res => res.json())
      .then(plotIndexData => setPlotIndex(plotIndexData.plots));
  }, [etype]);

  return (
    <div id="distributionPlots" className={className}>
      {protocols.length && (
        <Collapse
          className="mb-3"
          bordered={false}
          defaultActiveKey={protocols[0]}
        >
          {protocols.map(protocol => (
            <Panel key={protocol} header={<strong>{protocol}</strong>}>
              <div className="row">
                {plotIndex[protocol].sort().map(plotName => (
                  <div key={plotName} className="col-xs-6 col-md-3">
                    <ImageViewer
                      src={expEphysPopulationPlotPath(etype, protocol, plotName)}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};


export default ExpEphysDistribution;
