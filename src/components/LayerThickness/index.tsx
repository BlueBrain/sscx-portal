import React, { ReactNode } from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import ErrorBoundary from '../ErrorBoundary';
import HttpDownloadButton from '../../components/HttpDownloadButton';
import { downloadAsJson } from '../../utils';
import { Layer } from '../../types';
import ResponsiveTable from '../ResponsiveTable';
import { getData } from './layerThicknessUtils';


const classPrefix = 'layer-thickness__';

export type LayerThicknessProps = {
  layer: Layer;
  data?: ElasticSearchViewQueryResponse<any>['hits']['hits'];
  className?: string;
};

type SliceElement = {
  name: string;
  images: ReactNode;
  layerThicknesses: ReactNode;
}

const LayerThickness: React.FC<LayerThicknessProps> = ({ layer, data = [], className = '' }) => {
  const { sliceCollections, unit, factsheetData } = getData(layer, data);

  const columns = [
    { dataIndex: 'name' as keyof SliceElement, title: 'Animal' },
    { dataIndex: 'images' as keyof SliceElement, title: 'Preview' },
    { dataIndex: 'layerThicknesses' as keyof SliceElement, title: <>Layer thickness, {unit} (mean ± std)</> },
  ];

  return (
    <ErrorBoundary>
      <div id="layerThickness" className={`${classPrefix}basis ${className}`}>
        <ResponsiveTable<SliceElement>
          columns={columns}
          data={sliceCollections}
          rowKey={({ name }) => name}
        />

        <div className="text-right mt-2">
          <HttpDownloadButton
            onClick={() => downloadAsJson(factsheetData, `${layer}-thickness-factsheet.json`)}
          >
            factsheet
          </HttpDownloadButton>
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default LayerThickness;

