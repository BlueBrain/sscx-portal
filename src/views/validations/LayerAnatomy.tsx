import React from 'react';

import LayerAnatomyTemplate from '../../templates/LayerAnatomy';
import { colorName, sectionTitle } from './config';

export default () => (
  <LayerAnatomyTemplate
    color={colorName}
    sectionTitle={sectionTitle}
    dataQuery={() => ''}
  >
    {data => ''}
  </LayerAnatomyTemplate>
);
