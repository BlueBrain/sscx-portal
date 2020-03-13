import React from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';
import DataFilter from '../DataFilter';
import ErrorBoundary from '../ErrorBoundary';

type DataShape = {
  brainLocation: {
    layer: {
      label: string;
    };
  };
  series: {
    statistic: string;
    value: {
      '@value': number;
    };
    unitCode: string;
  }[];
};

export type LayerThicknessProps = {
  data?: ElasticSearchViewQueryResponse<any>['hits']['hits'];
};

const LayerThickness: React.FC<LayerThicknessProps> = ({ data = [] }) => {
  return (
    <ErrorBoundary>
      <DataFilter<DataShape>
        data={data}
        type="https://neuroshapes.org/LayerThickness"
      >
        {ds => (
          <>
            <h1>Layer thickness summary</h1>
            {ds.map(d => (
              <>
                <p>region: {d.brainLocation.layer.label}</p>
                {d.series.map(s => (
                  <p>
                    {s.statistic}: {s.value['@value']} {s.unitCode}
                  </p>
                ))}
              </>
            ))}
            <h1>Layer thickness per specimen</h1>
            <i>missing data...</i>
          </>
        )}
      </DataFilter>
    </ErrorBoundary>
  );
};
export default LayerThickness;
