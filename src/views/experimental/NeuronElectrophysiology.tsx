import React from 'react';
import { useHistory } from 'react-router-dom';

import Data from '../../layouts/Data';
import { electroPhysiologyDataQuery } from '../../queries/es';
import useQuery from '../../hooks/useQuery';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import { colorName } from './config';
import List from '../../components/List';
import ComboSelector from '../../components/ComboSelector';
import Collapsible from '../../components/Collapsible';
import ScrollTo from '../../components/ScrollTo';
import eTypes from '../../__generated__/experimentalData.json';

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
  const etypeData = eTypes.find(etype => etype.label === currentEtype);
  const instances = etypeData ? etypeData.experiments.map(e => e.label) : [];

  return (
    <>
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
                alt="Electro-physiology"
              />
            }
            list1={
              <List
                title="e-type"
                list={eTypes.map(etype => etype.label)}
                color={colorName}
                onSelect={setEtype}
                defaultValue={currentEtype}
              />
            }
            list2={
              <List
                title={`Experiment instance (${instances.length})`}
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
      <Data
        hasData={!!currentEtype && !!currentInstance}
        query={electroPhysiologyDataQuery(currentEtype, currentInstance)}
      >
        {data => (
          <>
            <Collapsible
              title={`Raw query result for ${currentEtype}_${currentInstance}`}
            >
              <code>{JSON.stringify(data, null, 2)}</code>
            </Collapsible>
          </>
        )}
      </Data>
    </>
  );
};

export default LayerAnatomy;
