import React from 'react';

import LayerAnatomyTemplate from '../../templates/LayerAnatomy';
import { color, sectionTitle } from './config';
import { layerAnatomyDataQuery } from '../../queries/es';
import Collapsible from '../../components/Collapsible';
import DataContainer from '../../components/DataContainer';
import ESData from '../../components/ESData';
import LayerThickness from '../../components/LayerThickness';
import NeuralDensity from '../../components/NeuralDensity';
import LayerAnatomySummary from '../../components/LayerAnatomySummary';
import { mock } from './mock';

const LayerAnatomyView = () => (
  <LayerAnatomyTemplate
    color={color}
    sectionTitle={sectionTitle}
  >
    {(layer) => (
      <DataContainer
        visible={!!layer}
        navItems={[
          { id: 'layerSection', label: 'Layer' },
          { id: 'summarySection', label: 'Summary' },
        ]}
      >
        <ESData query={layerAnatomyDataQuery}>
          {data => (
            <>{mock && (
              <>
                <Collapsible id="layerSection" title={`Layer ${layer}`}>
                  <LayerThickness layer={layer} data={mock.hits.hits} />
                  <NeuralDensity layer={layer} data={mock.hits.hits} className="mt-3"/>
                </Collapsible>

                <Collapsible id="summarySection" title="Summary" className="mt-4">
                  <LayerAnatomySummary data={mock.hits.hits} highlightLayer={layer} />
                </Collapsible>
              </>
            )}</>
          )}
        </ESData>
      </DataContainer>
    )}
  </LayerAnatomyTemplate>
);

export default LayerAnatomyView;
