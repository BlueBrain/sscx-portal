import React, { ReactNode } from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import ErrorBoundary from '../ErrorBoundary';
import NumberFormat from '../NumberFormat';
import ResponsiveTable from '../ResponsiveTable';



const classPrefix = 'layer-anatomy-summary__';

export type LayerAnatomySummaryProps = {
  data?: ElasticSearchViewQueryResponse<any>['hits']['hits'];
  highlightLayer?: string;
};

type SummaryData ={
  layer: ReactNode,
  thicknessEntityDescription: ReactNode;
  thickness: ReactNode,
  thicknessN: ReactNode,
  densityMean: ReactNode,
  densityStd: ReactNode,
  densityN: ReactNode
}

const LayerAnatomySummary: React.FC<LayerAnatomySummaryProps> = ({ data = [], highlightLayer = '' }) => {
  const entities = data.map(document => document._source);

  let densityUnit: string;
  let thicknessUnit: string;

  const layers = Array
    .from(new Set(entities.map(e => e.brainLocation?.layer?.label)))
    .filter(Boolean)
    .sort();

  const summary: SummaryData[] = layers.map((layer: string) => {
    const densityEntity = entities.find((entity) => (
      entity['@type'].toString().includes('NeuronDensity')
        && entity.brainLocation?.layer?.label === layer
        && entity.derivation
    ));

    const densityMean = densityEntity?.series.find((s: any) => s.statistic === 'mean')?.value;
    densityUnit = densityEntity?.series.find((s: any) => s.statistic === 'mean')?.unitCode;
    const densityN = densityEntity?.series.find((s: any) => s.statistic === 'N')?.value;
    const densityStd = densityEntity?.series
      .find((s: any) => s.statistic === 'standard deviation')?.value;

    const thicknessEntity = entities.find((entity) => (
      entity['@type'].toString().includes('Thickness')
        && entity.brainLocation?.layer?.label === layer
        && entity.derivation?.length > 1
    ));

    const thicknessMean = thicknessEntity?.series.find((s: any) => s.statistic === 'mean')?.value;
    thicknessUnit = thicknessEntity?.series.find((s: any) => s.statistic === 'mean')?.unitCode;
    const thicknessN = thicknessEntity?.series.find((s: any) => s.statistic === 'N')?.value;

    const isHighlight = highlightLayer.includes(layer.replace('layer ', ''));

    return {
      layer: <span className="text-capitalize">{layer}</span>,
      thicknessEntityDescription: thicknessEntity.description,
      thickness: <NumberFormat value={thicknessMean} />,
      thicknessN: <NumberFormat value={thicknessN} prefix="n=" />,
      densityMean: <NumberFormat value={densityMean} />,
      densityStd: <NumberFormat value={densityStd} prefix="± " />,
      densityN: <NumberFormat value={densityN} prefix="n=" />,
      isHighlight,
    };
  });

  const columns = [
    { dataIndex: 'layer' as keyof SummaryData, title: 'Layer' },
    { dataIndex: 'thickness' as keyof SummaryData, title: <>Layer thickness, {thicknessUnit} (mean)*</>, colSpan: 2 },
    { dataIndex: 'thickness' as keyof SummaryData, colSpan: 0 },
    { dataIndex: 'densityMean' as keyof SummaryData, title: <>Neuron density, {densityUnit} (mean ± std)</>, colSpan: 3 },
    { dataIndex: 'densityStd' as keyof SummaryData, colSpan: 0 },
    { dataIndex: 'densityN' as keyof SummaryData, colSpan: 0 },
  ];

  return (
    <ErrorBoundary>
      {!!summary.length && (
        <div id="layerAnatomySummary" className={`${classPrefix}basis`}>
          <ResponsiveTable<SummaryData> columns={columns} data={summary} />
          <small className="ant-typography ant-typography-secondary">
            * {summary[0]?.thicknessEntityDescription}
          </small>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default LayerAnatomySummary;
