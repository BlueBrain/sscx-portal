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
import SectionNav from '../../layouts/SectionNav';
import ResponsiveTable from '../../components/ResponsiveTable';

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
            <>{data && (
              <>
                <Collapsible id="layerSection" title={`Layer ${layer}`}>
                  <LayerThickness layer={layer} data={data} />
                  <NeuralDensity layer={layer} data={data} className="mt-3"/>
                </Collapsible>

                <Collapsible id="summarySection" title="Summary" className="mt-4">
                  <LayerAnatomySummary data={data} highlightLayer={layer} />
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
