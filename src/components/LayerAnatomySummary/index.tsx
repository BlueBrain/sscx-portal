import React from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import ErrorBoundary from '../ErrorBoundary';

import './style.less';

const classPrefix = 'layer-anatomy-summary__';

export type LayerAnatomySummaryProps = {
  data?: ElasticSearchViewQueryResponse<any>['hits']['hits'];
};

const LayerAnatomySummary: React.FC<LayerAnatomySummaryProps> = ({ data = [] }) => {
  const entities = data.map(document => document._source);

  const layers = Array
    .from(new Set(entities.map(e => e.brainLocation?.layer?.label)))
    .filter(Boolean)
    .sort();

  const summary = layers.map((layer: string) => {
    const densityEntity = entities.find((entity) => {
      return entity['@type'].toString().includes('NeuronDensity')
        && entity.brainLocation?.layer?.label === layer
        && entity.derivation
    });

    const densityMean = densityEntity?.series.find(s => s.statistic === 'mean')?.value;
    const densityUnit = densityEntity?.series.find(s => s.statistic === 'mean')?.unitCode;
    const densityN = densityEntity?.series.find(s => s.statistic === 'N')?.value;
    const densityStd = densityEntity?.series
      .find(s => s.statistic === 'standard deviation')?.value;

    const thicknessEntity = entities.find((entity) => {
      return entity['@type'].toString().includes('Thickness')
        && entity.brainLocation?.layer?.label === layer
        && entity.derivation?.length > 1
    });

    const thicknessMean = thicknessEntity?.series.find(s => s.statistic === 'mean')?.value;
    const thicknessUnit = thicknessEntity?.series.find(s => s.statistic === 'mean')?.unitCode;
    const thicknessN = thicknessEntity?.series.find(s => s.statistic === 'N')?.value;

    return {
      layer,
      thickness: {
        mean: thicknessMean,
        unit: thicknessUnit,
        n: thicknessN,
      },
      density: {
        mean: densityMean,
        std: densityStd,
        unit: densityUnit,
        n: densityN,
      },
    };
  });

  return (
    <ErrorBoundary>
      {!!summary.length && <div className={`${classPrefix}basis`}>
        <table>
          <thead>
            <tr>
              <th>Layer</th>
              <th colSpan={2} >Layer thickness, {summary[0].thickness.unit}</th>
              <th colSpan={3} >Neuron density, {summary[0].density.unit}</th>
            </tr>
          </thead>
          <tbody>
            {summary.map(row => (
              <tr key={row.layer}>
                <td className="text-capitalize">{row.layer}</td>
                <td>{row.thickness.mean}</td>
                <td>(n={row.thickness.n})</td>
                <td>{row.density.mean}</td>
                <td>± {row.density.std}</td>
                <td>(n={row.density.n})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </ErrorBoundary>
  );
}

export default LayerAnatomySummary;
