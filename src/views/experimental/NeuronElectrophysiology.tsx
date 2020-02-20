import React from 'react';
import { useHistory } from 'react-router-dom';
import { useNexus } from '@bbp/react-nexus';

import { sscx } from '../../config';
import LayerAnatomySelector from '../../components/LayerAnatomySelector';
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

  const addParam = (key: string, value: string): void => {
    query.set(key, value);
    history.push(`?${query.toString()}`);
  };

  const setEtype = (etype: string) => {
    addParam('etype', etype);
  };
  const setInstance = (instance: string) => {
    addParam('etype_instance', instance);
  };

  const currentEtype: string = query.get('etype');
  const currentInstance: string = query.get('etype_instance');

  useNexus(nexus =>
    nexus.View.elasticSearchQuery(
      sscx.org,
      sscx.project,
      sscx.expNeuronElectroViewId,
      {
        query: {
          term: {
            _deprecated: false,
          },
        },
      },
    ),
  );

  return (
    <Filters
      primaryColor={colorName}
      backgroundAlt
      hasData={!!currentEtype && !!currentInstance}
    >
      <div className="center-col">
        <Title
          primaryColor={colorName}
          title="Neuron Electrophysiology"
          subtitle="Experimental Data"
          hint="Select a layer of interest in the S1 of the rat brain."
        />
        {!!currentEtype && (
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
          list1={
            <List
              title="e-type"
              list={eTypes}
              color={colorName}
              onSelect={setEtype}
              defaultValue={currentEtype}
            />
          }
          list2={
            <List
              title="e-type"
              list={instances}
              color={colorName}
              onSelect={setInstance}
              defaultValue={currentInstance}
            />
          }
          listsTitle="Select cell type"
          list2Open={!!currentEtype}
        />
      </div>
    </Filters>
  );
};

export default LayerAnatomy;
