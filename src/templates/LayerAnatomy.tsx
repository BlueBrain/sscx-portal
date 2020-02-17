import React from 'react';
import { useHistory } from 'react-router-dom';

import LayerAnatomySelector from '../components/LayerAnatomySelector';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Selector from '../components/Selector';
import useQuery from '../hooks/useQuery';
import Filters from '../layouts/Filters';
import { Layer, Color } from '../types';
import { accentColors } from '../config';
import { lorem } from '../views/Styleguide';

export type LayerAnatomyTemplateProps = {
  color: Color;
};

const LayerAnatomy: React.FC<LayerAnatomyTemplateProps> = ({ color }) => {
  const query = useQuery();
  const history = useHistory();

  const setLayerQuery = (layer: Layer) => {
    history.push(`?layer=${layer}`);
  };
  const currentLayer: Layer = query.get('layer') as Layer;

  return (
    <Filters primaryColor={color} backgroundAlt hasData={!!currentLayer}>
      <div className="center-col">
        <Title
          primaryColor={color}
          title="Layer Anatomy"
          subtitle="Experimental Data"
          hint="Select a layer of interest in the S1 of the rat brain."
        />
        {!!currentLayer && (
          <div role="information">
            <InfoBox title="Longer Text" text={lorem} color={color} />
            <br />
            <InfoBox text={`This one has no title o_0\n${lorem}`} />
          </div>
        )}
      </div>
      <div className="center-col">
        <Selector title="Choose a layer">
          <LayerAnatomySelector
            color={accentColors[color]}
            defaultActiveLayer={currentLayer}
            onLayerSelected={setLayerQuery}
          />
        </Selector>
      </div>
    </Filters>
  );
};

export default LayerAnatomy;
