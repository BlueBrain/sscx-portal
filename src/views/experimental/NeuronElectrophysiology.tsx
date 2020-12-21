import React from 'react';
import { useHistory } from 'react-router-dom';
import { useNexusContext } from '@bbp/react-nexus';

import ESData from '../../components/ESData';
import DataContainer from '../../components/DataContainer';
import ImageViewer from '../../components/ImageViewer';
import NexusPlugin from '../../components/NexusPlugin';
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
import eTypes from '../../__generated__/experimentalData.json';

const NeuronElectrophysiology: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const nexus = useNexusContext();

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
            <div role="information" className="mb-4">
              <InfoBox title="Longer Text" text={lorem} color={colorName} />
            </div>
          )}
        </div>
        <div className="center-col">
          <ComboSelector
            selector={
              <img
                src={require('url:../../assets/images/electroIllustration.svg')}
                alt="Electro-physiology"
                className="electro-phys-image"
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
            withGradient
          />
        </div>
      </Filters>

      <DataContainer visible={!!currentEtype && !!currentInstance}>
        <ESData
          hasData={!!currentEtype && !!currentInstance}
          query={electroPhysiologyDataQuery(currentEtype, currentInstance)}
        >
          {esDocuments => (
            <>
              <Collapsible title="Population">
                <h3>Factsheet</h3>
                <p>TBD</p>

                <h3 className="mt-3">Distribution</h3>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <ImageViewer src="/data/assets/images/population-distribution-1.png" />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <ImageViewer src="/data/assets/images/population-distribution-2.png" />
                  </div>
                </div>

                <h3 className="mt-3">Experimental instances</h3>
                <table style={{width: '100%'}}>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>M-Type</th>
                    <th>E-Type</th>
                    <th>Organization</th>
                    <th>Person</th>
                  </tr>
                  <tr>
                    <td>Instance 1</td>
                    <td></td>
                    <td>L23_BP</td>
                    <td>cNAC</td>
                    <td>LNMC</td>
                    <td>Ying Shi</td>
                  </tr>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </table>
              </Collapsible>

              <Collapsible
                className="mt-4"
                title={`Electrophysiological Recordings for ${currentEtype}_${currentInstance}`}
              >
                <NexusPlugin
                  name="neuron-electrophysiology"
                  resource={esDocuments.length ? esDocuments[0]._source : null}
                  nexusClient={nexus}
                />
              </Collapsible>
            </>
          )}
        </ESData>
      </DataContainer>
    </>
  );
};

export default NeuronElectrophysiology;
