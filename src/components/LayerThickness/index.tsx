import React, { ReactNode } from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import NumberFormat from '../NumberFormat';
import ErrorBoundary from '../ErrorBoundary';
import { Layer } from '../../types'
import NexusImage from '../NexusImage';
import { sscx } from '../../config';
import ResponsiveTable from '../ResponsiveTable';

// import './style.scss';


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

const LayerThickness: React.FC<LayerThicknessProps> = ({ layer, data = [], className='' }) => {
  const entities = data.map(document => document._source);

  const rawSliceCollections = entities
    .filter(entity => entity['@type'].toString().includes('SliceCollection'));

  const rawLayerThicknesses = entities
    .filter(entity => entity['@type'].toString().includes('LayerThickness'))
    .filter(entity => !Array.isArray(entity.derivation));

  // @ts-ignore
  const layerNums = layer.match(/(\d+)/)[0].split('');

  const getLayerThicknesses = (sliceCollection) => (
    rawLayerThicknesses
  // filter layerThicknesses derived from current sliceCollection
  .filter(rawLayerThickness => {
    return rawLayerThickness.derivation?.entity['@id'] === sliceCollection['@id'];
  })
  // filter layerThicknesses for current layers
  .filter(rawLayerThickness => {
    return layerNums
      .map(layerNum => `layer ${layerNum}`)
      .includes(rawLayerThickness.brainLocation?.layer?.label);
  })
  // compose simplified layer thickness objects
  .map(rawLayerThickness => ({
    layer: rawLayerThickness.brainLocation.layer.label,
    unit: rawLayerThickness.series.find((s: any) => s.statistic === 'mean')?.unitCode,
    mean: rawLayerThickness.series.find((s: any) => s.statistic === 'mean')?.value,
    std: rawLayerThickness.series.find((s: any) => s.statistic === 'standard deviation')?.value,
    n: rawLayerThickness.series.find((s: any) => s.statistic === 'N')?.value,
  }))
  // sort by layer
  .sort((a, b) => a.layer < b.layer ? -1 : 1)
  )

  const sliceCollections = rawSliceCollections
    // construct simplified sliceCollection object
    .map(sliceCollection => ({
      name: sliceCollection.name,
      // @ts-ignore
      images: sliceCollection.image.map(imageEntity => imageEntity['@id']).map((image: string) => (
        <div key={image} className="image-container">
          <NexusImage
            org={sscx.org}
            project={sscx.project}
            imageUrl={image}
          />
        </div>
      )),
      layerThicknesses: <SliceRow layerThicknesses={getLayerThicknesses(sliceCollection)} />
    
    }))
    // sort by species name
    .sort((a, b) => a.name < b.name ? -1 : 1);

  const unit = rawLayerThicknesses[0]?.series[0]?.unitCode;

  const columns = [
    { dataIndex: 'name' as keyof SliceElement, title: 'Animal'},
    { dataIndex: 'images' as keyof SliceElement, title: 'Preview'},
    { dataIndex: 'layerThicknesses' as keyof SliceElement, title: <>Layer thickness, {unit} (mean ± std)</>}
  ]

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
