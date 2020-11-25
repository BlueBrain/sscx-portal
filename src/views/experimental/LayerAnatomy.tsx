import React from 'react';

import LayerAnatomyTemplate from '../../templates/LayerAnatomy';
import { colorName, sectionTitle } from './config';
import { layerAnatomyDataQuery } from '../../queries/es';
import Collapsible from '../../components/Collapsible';
import LayerThickness from '../../components/LayerThickness';
import NeuralDensity from '../../components/NeuralDensity';
import LayerAnatomySummary from '../../components/LayerAnatomySummary';

export default () => (
  <LayerAnatomyTemplate
    color={colorName}
    sectionTitle={sectionTitle}
    dataQuery={layerAnatomyDataQuery}
  >
    {(layer, data) => (
      <>
        <Collapsible title="Summary">
          <LayerAnatomySummary data={data}/>
        </Collapsible>
        {layer && (
          <Collapsible title={`Layer ${layer}`}>
            <LayerThickness layer={layer} data={data} />
            <NeuralDensity layer={layer} data={data} className="mt-3"/>
          </Collapsible>
        )}
      </>
    )}
  </LayerAnatomyTemplate>
);
