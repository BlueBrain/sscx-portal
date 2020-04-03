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
import ComboSelector from '../../components/ComboSelector';
import List from '../../components/List';

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
          title="Neuron Physiology"
          subtitle="Experimental Data"
          hint="Select a layer of interest in the S1 of the rat brain."
        />
        {!!currentLayer && (
          <div role="information">
            <InfoBox color="yellow" title="Longer Text" text={lorem} />
          </div>
        )}
      </div>
      <div className="center-col">
        <ComboSelector
          selectorTitle="1. Choose a layer"
          selector={
            <LayerAnatomySelector
              color={colorName}
              defaultActiveLayer={currentLayer}
              onLayerSelected={setLayerQuery}
            />
          }
          listsTitle="2. Select reconstruction"
          list1={
            <List
              list={['BP', 'ChC', 'a', 'b', 'c']}
              title="m-type"
              color={colorName}
            />
          }
          list2={
            <List
              list={['instance 1', 'instance 2', '1', '2', '3']}
              title="Reconstruction instances"
              color={colorName}
            />
          }
        />
      </div>
    </Filters>
  );
};

export default LayerAnatomy;
