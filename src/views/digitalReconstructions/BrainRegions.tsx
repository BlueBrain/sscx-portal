import React from 'react';

import BrainRegionTemplate from '../../templates/BrainRegions';
import BrainSubregionFactsheet from '../../components/BrainSubregionFactsheet';
import { colorName, sectionTitle } from './config';
import { subregionFactsheetPath } from '../../queries/http';
import Collapsible from '../../components/Collapsible';

export default () => (
  <BrainRegionTemplate
    color={colorName}
    sectionTitle={sectionTitle}
    factsheetPath={subregionFactsheetPath}
  >
    {data => (
      <>
        <Collapsible title="Subregion Factsheet">
          <BrainSubregionFactsheet data={data} />
        </Collapsible>
      </>
    )}
  </BrainRegionTemplate>
);
