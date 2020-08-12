import React from 'react';

import MicrocircuitsTemplates from '../../templates/Microcircuit';
import { colorName, sectionTitle } from './config';
import { layerFactsheetPath } from '../../queries/http';
import Collapsible from '../../components/Collapsible';
import LayerFactsheet from '../../components/LayerFactsheet';

export default () => (
  <MicrocircuitsTemplates
    color={colorName}
    sectionTitle={sectionTitle}
    factsheetPath={layerFactsheetPath}
  >
    {(data, title) => (
      <>
        <Collapsible title={title}>
          <LayerFactsheet data={data} />
        </Collapsible>
      </>
    )}
  </MicrocircuitsTemplates>
);
