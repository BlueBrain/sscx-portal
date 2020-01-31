import React from 'react';
import { useHistory } from 'react-router-dom';

import LayerAnatomySelector, {
  Layer,
} from '../../components/LayerAnatomySelector';
import useQuery from '../../hooks/useQuery';

const LayerAnatomy: React.FC = props => {
  const query = useQuery();
  const history = useHistory();

  const setLayerQuery = (layer: Layer) => {
    history.push(`?layer=${layer}`);
  };

  return (
    <>
      <h1 role="title">Layer Anatomy</h1>
      <LayerAnatomySelector
        defaultActiveLayer={query.get('layer') as Layer}
        onLayerSelected={setLayerQuery}
      />
    </>
  );
};

export default LayerAnatomy;
