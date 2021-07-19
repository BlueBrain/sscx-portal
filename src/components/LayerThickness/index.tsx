import React, { ReactNode } from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import NumberFormat from '../NumberFormat';
import ErrorBoundary from '../ErrorBoundary';
import { Layer } from '../../types';
import NexusImage from '../NexusImage';
import { sscx } from '../../config';
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
  const { sliceCollections, unit } = getData(layer, data);

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
        />
      </div>
    </ErrorBoundary>
  );
};
export default LayerThickness;





type SliceRowProps = {
  layerThicknesses: Array<{
    layer: string,
    mean: string;
    std: string;
    n: string;
  }>
}

const SliceRow: React.FC<SliceRowProps> = ({layerThicknesses}) => {
return (
  <>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-capitalize text-nowrap">
            {layerThickness.layer}
          </span>
          <br/>
        </div>
      ))}
    </td>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-nowrap">
            <NumberFormat value={layerThickness.mean} />
          </span>
          <br/>
        </div>
      ))}
    </td>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-nowrap">
            <NumberFormat value={layerThickness.std} prefix="± " />
          </span>
          <br/>
        </div>
      ))}
    </td>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-nowrap">
            <NumberFormat value={layerThickness.n} prefix={'n='} />
          </span>
          <br/>
        </div>
      ))}
    </td>
  </>
)}
