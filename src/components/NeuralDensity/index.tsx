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

const NeuralDensity: React.FC<LayerThicknessProps> = ({ data = [] }) => {
  return (
    <ErrorBoundary>
      <DataFilter<DataShape>
        data={data}
        type="https://neuroshapes.org/NeuronDensity"
      >
        {neuronDensityData => (
          <>
            {neuronDensityData.map(d => (
              <div key={d['@id']}>
                {d.series.map &&
                  d.series.map(s => (
                    <p key={`${s.statistic}-${s.value['value']}-${s.unitCode}`}>
                      {s.statistic}: {s.value['@value']} {s.unitCode}
                    </p>
                  ))}
              </div>
            ))}
          </>
        )}
      </DataFilter>
    </ErrorBoundary>
  );
};

export default NeuralDensity;
