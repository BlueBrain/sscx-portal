import React from 'react';

import MicrocircuitTemplate from '@/templates/Microcircuit';
import DataContainer from '@/components/DataContainer'
import Collapsible from '@/components/Collapsible';
import Video, { composeSources } from '@/components/VideoPlayer';
import { colorName, sectionTitle } from './config';


const PredictionsMicrocircuitView = () => (
  <MicrocircuitTemplate color={colorName} sectionTitle={sectionTitle}>
    {(subregion, layerNums) => (
      <DataContainer
        visible={!!layerNums.length}
        navItems={[
          { id: 'microcircuitSection', label: 'Microcircuit' },
        ]}
      >
        <Collapsible id="microcircuitSection" title={`${subregion} Microcircuit Factsheet`}>
          <Video
            key={subregion}
            sources={composeSources(`/predictions/microcircuit/${subregion}_microcircuit_activity`)}
            muted
            defaultSize={720}
            poster={null}
          />
        </Collapsible>
      </DataContainer>
    )}
  </MicrocircuitTemplate>
);


export default PredictionsMicrocircuitView;
