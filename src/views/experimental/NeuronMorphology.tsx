import React from 'react';
import { useHistory } from 'react-router-dom';
import { useNexusContext } from '@bbp/react-nexus';

import ESData from '../../components/ESData';
import HttpData from '../../components/HttpData';
import DataContainer from '../../components/DataContainer';
import LayerAnatomySelector from '../../components/LayerAnatomySelector';
import { morphologyDataQuery } from '../../queries/es';
import { expMorphologyFactsheetPath } from '../../queries/http';
import useQuery from '../../hooks/useQuery';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import NexusPlugin from '../../components/NexusPlugin';
import { lorem } from '../Styleguide';
import { colorName } from './config';
import { Layer } from '../../types';
import ComboSelector from '../../components/ComboSelector';
import Collapsible from '../../components/Collapsible';
import List from '../../components/List';
import expMorphologyData from '../../__generated__/exp-morphology-data.json';
import Factsheet from '../../components/Factsheet';
import NexusFileDownloadButton from '../../components/NexusFileDownloadButton';
import { sscx } from '../../config';


const NeuronExperimentalMorphology: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const nexus = useNexusContext();

  const addQueryParam = (key: string, value: string): void => {
    query.set(key, value);
    history.push(`?${query.toString()}`);
  };

  const setLayer = (layer: Layer) => {
    addQueryParam('layer', layer);
    addQueryParam('mtype', '');
    addQueryParam('instance', '');
  };
  const currentLayer: Layer = query.get('layer') as Layer;

  const mtypes =  currentLayer
    ? Object.keys(expMorphologyData[currentLayer]).sort() as string[]
    : [];

  const setMtype = (mtype: string) => {
    addQueryParam('mtype', mtype);
    addQueryParam('instance', '');
  };
  const currentMtype: string = query.get('mtype') as string;

  const instances = currentMtype
    ? expMorphologyData[currentLayer][currentMtype].sort()
    : []

  const setInstance = (instance: string) => {
    addQueryParam('instance', instance);
  };
  const currentInstance: string = query.get('instance') as string;

  const getMorphologyDistribution = (morphologyResource: any) => {
    return morphologyResource.distribution.find(d => d.name.match(/\.asc$/i));
  };

  return (
    <>
      <Filters primaryColor={colorName} backgroundAlt hasData={!!currentInstance}>
        <div className="center-col">
          <Title
            primaryColor={colorName}
            title={<span>Neuronal <br/> Morphology</span>}
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
                onLayerSelected={setLayer}
              />
            }
            listsTitle="2. Select reconstruction"
            list1={
              <List
                list={mtypes}
                defaultValue={currentMtype}
                title="m-type"
                color={colorName}
                onSelect={setMtype}
              />
            }
            list2={
              <List
                list={instances}
                defaultValue={currentInstance}
                title="Reconstructed morphology"
                color={colorName}
                onSelect={setInstance}
              />
            }
            list1Open={!!currentLayer}
            list2Open={!!currentMtype}
          />
        </div>
      </Filters>

      <DataContainer visible={!!currentInstance}>
        <Collapsible title={`Neuron Morphology ${currentMtype} ${currentInstance}`}>
          <HttpData path={expMorphologyFactsheetPath(currentInstance)}>
            {factsheetData => (
              <Factsheet facts={factsheetData[0].values} />
            )}
          </HttpData>

          <ESData
            hasData={!!currentInstance}
            query={morphologyDataQuery(currentMtype, currentInstance)}
          >
            {esDocuments => (
              <>
                {esDocuments.length  && (
                  <NexusFileDownloadButton
                    className="mt-2 mb-3"
                    filename={getMorphologyDistribution(esDocuments[0]._source).name}
                    url={getMorphologyDistribution(esDocuments[0]._source).contentUrl}
                    org={sscx.org}
                    project={sscx.project}
                  >
                    Download morphology
                  </NexusFileDownloadButton>
                )}
                <NexusPlugin
                  className="mt-3"
                  name="neuron-morphology"
                  resource={esDocuments.length ? esDocuments[0]._source : null}
                  nexusClient={nexus}
                />
              </>
            )}
          </ESData>
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default NeuronExperimentalMorphology;
