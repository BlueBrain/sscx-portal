import React from 'react';
import { useHistory } from 'react-router-dom';

import useQuery from '../../hooks/useQuery';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import { colorName } from './config';
import Selector from '../../components/Selector';
import { Layer } from '../../types';
import List from '../../components/List';
import ComboSelector from '../../components/ComboSelector';

const eTypes = ['bSTUT', 'cNAC', 'dNAC', 'cintAC'];
const instances = ['instance 1', 'instance 2'];

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
          title="Neuron Electrophysiology"
          subtitle="Experimental Data"
          hint="Select a layer of interest in the S1 of the rat brain."
        />
        {!!currentLayer && (
          <div role="information">
            <InfoBox title="Longer Text" text={lorem} color={colorName} />
          </div>
        )}
      </div>
      <div className="center-col">
        <ComboSelector
          selector={
            <img
              src={require('../../assets/images/electroIllustration.svg')}
              alt="EPFL logo"
            />
          }
          list1={<List title="e-type" list={eTypes} color={colorName} />}
          list2={<List title="e-type" list={instances} color={colorName} />}
          listsTitle="Select cell type"
        />
      </div>
    </Filters>
  );
};

export default LayerAnatomy;
