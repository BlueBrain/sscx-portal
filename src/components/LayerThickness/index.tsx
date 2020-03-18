import React from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';
import DataFilter from '../DataFilter';
import ErrorBoundary from '../ErrorBoundary';
import { IoMdDownload } from 'react-icons/io';

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
        {layerThicknessData => (
          <div>
            <div>
              <h1>Layer thickness summary</h1>
              {layerThicknessData.map(d => (
                <div key={d['@id']}>
                  <p>region: {d.brainLocation.layer.label}</p>
                  {d.series.map(s => (
                    <p key={`${s.statistic}-${s.value['value']}-${s.unitCode}`}>
                      {s.statistic}: {s.value['@value']} {s.unitCode}
                    </p>
                  ))}
                </div>
              ))}
              <h1>Layer thickness per specimen</h1>
              <i>missing data...</i>
            </div>
            <button className="icon-button__download">
              <IoMdDownload />
              {console.log(layerThicknessData)}
            </button>
          </div>
        )}
      </DataFilter>
    </ErrorBoundary>
  );
};
export default LayerThickness;
