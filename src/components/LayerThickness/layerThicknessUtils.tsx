import React from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';
import { Layer } from '../../types';
import NexusImage from '../NexusImage';
import { nexus } from '../../config';
import SliceRow from './SliceRow';
import NumberFormat from '../NumberFormat';


const getLayerMatch = (layer) => (layer.match(/(\d+)/)[0].split(''));

const getLayerThicknesses = (sliceCollection, rawLayerThicknesses, layer) => (
  rawLayerThicknesses
  // filter layerThicknesses derived from current sliceCollection
    .filter(rawLayerThickness => rawLayerThickness.derivation?.entity['@id'] === sliceCollection['@id'])
    // filter layerThicknesses for current layers
    .filter(rawLayerThickness => getLayerMatch(layer)
      .map(layerNum => `layer ${layerNum}`)
      .includes(rawLayerThickness.brainLocation?.layer?.label))
    // compose simplified layer thickness objects
    .map(rawLayerThickness => ({
      layer: rawLayerThickness.brainLocation.layer.label.replace(/layer /i, 'L'),
      unit: rawLayerThickness.series.find((s: any) => s.statistic === 'mean')?.unitCode,
      mean: rawLayerThickness.series.find((s: any) => s.statistic === 'mean')?.value,
      std: rawLayerThickness.series.find((s: any) => s.statistic === 'standard deviation')?.value,
      n: rawLayerThickness.series.find((s: any) => s.statistic === 'N')?.value,
      rawLayerThickness,
    }))
  // sort by layer
    .sort((a, b) => (a.layer < b.layer ? -1 : 1))
);


export const getData = (layer: Layer, entities?: any[]) => {
  const rawSliceCollections = entities
    .filter(entity => entity['@type'].toString().includes('SliceCollection'));

  const rawLayerThicknesses = entities
    .filter(entity => entity['@type'].toString().includes('LayerThickness'))
    .filter(entity => !Array.isArray(entity.derivation));


  const sliceCollections = rawSliceCollections
    // construct simplified sliceCollection object
    .map(sliceCollection => {
      const layerThicknesses = getLayerThicknesses(sliceCollection, rawLayerThicknesses, layer);
      return ({
        name: sliceCollection.name,
        // @ts-ignore
        images: sliceCollection.image.map(imageEntity => imageEntity['@id']).map((image: string) => (
          <div key={image} className="image-container">
            <NexusImage
              aspectRatio="5 / 4"
              org={nexus.org}
              project={nexus.project}
              imageUrl={image}
            />
          </div>
        )),
        layerThicknesses: <SliceRow layerThicknesses={layerThicknesses} />,
        n: (
          <td className="no-border">
            {layerThicknesses.map(layerThickness => (
              <div key={layerThickness.layer}>
                <span className="text-nowrap">
                  <NumberFormat value={layerThickness.n} />
                </span>
                <br />
              </div>
            ))}
          </td>
        ),
        rawLayerThicknesses: layerThicknesses.map(layerThickness => layerThickness.rawLayerThickness),
      });
    })
    // sort by species name
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  const unit = rawLayerThicknesses[0]?.series[0]?.unitCode;

  const factsheetData = sliceCollections
    .map(sliceCollection => sliceCollection.rawLayerThicknesses)
    .flat();

  return ({ unit, sliceCollections, factsheetData });
};
