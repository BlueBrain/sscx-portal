import React from 'react';
import { useHistory } from 'react-router-dom';

import LayerAnatomySelector from '../../components/LayerAnatomySelector';
import useQuery from '../../hooks/useQuery';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import { primaryColor, colorName } from './config';
import Selector from '../../components/Selector';
import { Layer } from '../../types';

const LayerAnatomy: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const setLayerQuery = (layer: Layer) => {
    history.push(`?layer=${layer}`);
  };
  const currentLayer: Layer = query.get('layer') as Layer;

  return (
    <Filters primaryColor={colorName} backgroundAlt hasData={!!currentLayer}>
      <div className="center-col">
        <Title
          primaryColor={colorName}
          title="Layer Anatomy"
          subtitle="Reconstruction Data"
          hint="Select a layer of interest in the S1 of the rat brain."
        />
        {!!currentLayer && (
          <div role="information">
            <InfoBox title="Longer Text" text={lorem} />
            <br />
            <InfoBox text={`This one has no title o_0\n${lorem}`} />
          </div>
        )}
      </div>
      <div className="center-col">
        <Selector title="Choose a layer">
          <LayerAnatomySelector
            color={primaryColor}
            defaultActiveLayer={currentLayer}
            onLayerSelected={setLayerQuery}
          />
        </Selector>
      </div>
    </Filters>
  );
};

export default LayerAnatomy;
