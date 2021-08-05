import React, { ReactNode } from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import ErrorBoundary from '../ErrorBoundary';
import HttpDownloadButton from '../../components/HttpDownloadButton';
import { downloadAsJson } from '../../utils';
import NumberFormat from '../NumberFormat';
import ResponsiveTable from '../ResponsiveTable';


const classPrefix = 'layer-anatomy-summary__';

export type LayerAnatomySummaryProps = {
  data?: ElasticSearchViewQueryResponse<any>['hits']['hits'];
  highlightLayer?: string;
};

type SummaryData = {
  name: string,
  layer: ReactNode,
  thicknessEntityDescription: ReactNode;
  thickness: ReactNode,
  thicknessN: ReactNode,
  densityMean: ReactNode,
  densityStd: ReactNode,
  densityN: ReactNode,
  rawThickness: any,
  rawDensity: any,
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
      name: densityEntity?.name,
      layer: <span className="text-capitalize">{layer}</span>,
      thicknessEntityDescription: thicknessEntity.description,
      thickness: <NumberFormat value={thicknessMean} />,
      thicknessN: <NumberFormat value={thicknessN} />,
      density: <><NumberFormat value={densityMean} /> &nbsp; <NumberFormat value={densityStd} prefix="± " /></>,
      densityN: <NumberFormat value={densityN} />,
      rawThickness: thicknessEntity,
      rawDensity: densityEntity,
      isHighlight,
    };
  });

  const factsheetData = summary.flatMap(summaryData => ([summaryData.rawDensity, summaryData.rawThickness]));

  const columns = [
    { dataIndex: 'layer' as keyof SummaryData, title: 'Layer' },
    { title: 'Layer thickness',
      children: [
        { dataIndex: 'thickness' as keyof SummaryData, title: <> Mean*, {thicknessUnit} </> },
        { dataIndex: 'thicknessN' as keyof SummaryData, title: 'No. of measurements', className: 'narrowColumn' },
      ] },
    { title: 'Neuron density',
      children: [
        { dataIndex: 'density' as keyof SummaryData, title: <>Mean ± std, {densityUnit}</> },
        { dataIndex: 'densityN' as keyof SummaryData, title: 'No. of measurements', className: 'narrowColumn' },
      ] },

  ];

  return (
    <ErrorBoundary>
      {!!summary.length && (
        <div id="layerAnatomySummary" className={`${classPrefix}basis`}>
          <ResponsiveTable<SummaryData> columns={columns} data={summary} rowKey={({ name }) => name} />
          <small className="ant-typography ant-typography-secondary">
            * {summary[0]?.thicknessEntityDescription}
          </small>

          <div className="text-right mt-2">
            <HttpDownloadButton
              onClick={() => downloadAsJson(factsheetData, 'experimental-layer-anatomy-factsheet.json')}
            >
              factsheet
            </HttpDownloadButton>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default LayerAnatomySummary;
