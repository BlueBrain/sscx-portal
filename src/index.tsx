import React from 'react';
import ReactDOM from 'react-dom';

import Example from './components/example';
import BrainRegionsSelector from './components/BrainRegionsSelector';
import LayerAnatomySelector from './components/LayerAnatomySelector';

ReactDOM.render(
  <>
    <div>
      <LayerAnatomySelector
        defaultActiveLayer="L23"
        onLayerSelected={l => console.log('active layer', l)}
      />
    </div>
    <div>
      <BrainRegionsSelector
        defaultActiveBrainRegion="S1HL"
        onBrainRegionSelected={r => console.log('active region', r)}
      />
    </div>
  </>,
  document.getElementById('app'),
);
