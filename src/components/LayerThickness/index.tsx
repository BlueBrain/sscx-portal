import React from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';
import DataFilter from '../DataFilter';

export type LayerThicknessProps = {
  data?: ElasticSearchViewQueryResponse<any>['hits']['hits'];
};

const LayerThickness: React.FC<LayerThicknessProps> = ({ data = [] }) => {
  const validData = data.filter(d =>
    d['_source']['@type'].includes('https://neuroshapes.org/LayerThickness'),
  );

  return (
    <>
      <h1>Layer thickness summary</h1>
      {validData.map(d => (
        <>
          <p>region: {d['_source'].brainLocation.layer.label}</p>
          {d['_source'].series.map(s => (
            <p>
              {s.statistic}: {s.value['@value']} {s.unitCode}
            </p>
          ))}
        </>
      ))}
      <h1>Layer thickness per specimen</h1>
      <i>missing data...</i>
    </>
  );
};

const LayerThickness2: React.FC<LayerThicknessProps> = ({ data = [] }) => {
  return (
    <DataFilter data={data} type="https://neuroshapes.org/LayerThickness">
      {d => (
        <>
          <h1>Layer thickness summary</h1>
          {/* <p>region: {d[0].brainLocation.layer.label}</p> */}
        </>
      )}
    </DataFilter>
  );
};
export default LayerThickness2;
