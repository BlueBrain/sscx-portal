import React from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import DataFilter from '../DataFilter';
import ErrorBoundary from '../ErrorBoundary';
// import DownloadButton from '../DownloadButton';

import './style.less';

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
          <div className="neural-density__basis">
            <div className="data-view">
              {neuronDensityData.map(d => (
                <div key={d['@id']}>
                  {d.series.map &&
                    d.series.map(s => (
                      <p
                        key={`${s.statistic}-${s.value['value']}-${s.unitCode}`}
                      >
                        {s.statistic}: {s.value['@value']} {s.unitCode}
                      </p>
                    ))}
                </div>
              ))}
            </div>
            <div className="download">
              {/* <DownloadButton
                data={neuronDensityData.map(d => ({
                  '@type': 'Resource',
                  resourceId: d['@id'],
                }))}
              /> */}
            </div>
          </div>
        )}
      </DataFilter>
    </ErrorBoundary>
  );
};

export default NeuralDensity;
