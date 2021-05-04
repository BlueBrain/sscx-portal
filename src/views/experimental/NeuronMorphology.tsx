import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useNexusContext } from '@bbp/react-nexus';

import ServerSideContext from '../../context/server-side-context';
import ESData from '../../components/ESData';
import HttpData from '../../components/HttpData';
import DataContainer from '../../components/DataContainer';
import LayerAnatomySelector from '../../components/LayerAnatomySelector';
import ImageViewer from '../../components/ImageViewer';
import { morphologyDataQuery, mtypeExpMorphologyListDataQuery } from '../../queries/es';
import { expMorphologyFactsheetPath, expMorphMemodelsPath } from '../../queries/http';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import NexusPlugin from '../../components/NexusPlugin';
import { colorName } from './config';
import { Layer } from '../../types';
import ComboSelector from '../../components/ComboSelector';
import Collapsible from '../../components/Collapsible';
import List from '../../components/List';
import ExpMorphMemodelList from '../../components/ExpMorphMemodelList';
import expMorphologyData from '../../__generated__/exp-morphology-data.json';
import Factsheet from '../../components/Factsheet';
import ExpMorphologyTable from '../../components/ExpMorphologyTable';
import NexusFileDownloadButton from '../../components/NexusFileDownloadButton';
import { sscx, basePath } from '../../config';


const NeuronExperimentalMorphology: React.FC = () => {
  const router = useRouter();
  const nexus = useNexusContext();
  const serverSideContext = useContext(ServerSideContext);

  const query = { ...serverSideContext.query, ...router.query };

  const setQuery = (query: any): void => {
    router.push({ query, pathname: router.pathname }, undefined, { shallow: true });
  };

  const setLayer = (layer: Layer) => {
    setQuery({
      layer,
      mtype: null,
      instance: null,
    });
  };
  const currentLayer: Layer = query.layer as Layer;

  const mtypes =  currentLayer
    ? Object.keys(expMorphologyData[currentLayer]).sort() as string[]
    : [];

  const setMtype = (mtype: string) => {
    setQuery({
      mtype,
      layer: currentLayer,
      instance: null,
    });
  };
  const currentMtype: string = query.mtype as string;

  const instances = currentMtype
    ? (expMorphologyData as any)[currentLayer][currentMtype].sort()
    : []

  const setInstance = (instance: string) => {
    setQuery({
      instance,
      layer: currentLayer,
      mtype: currentMtype,
    });
  };
  const currentInstance: string = query.instance as string;

  const getMorphologyDistribution = (morphologyResource: any) => {
    return morphologyResource.distribution.find((d: any) => d.name.match(/\.asc$/i));
  };

  const getAndSortMorphologies = (esDocuments) => {
    return esDocuments
      .map(esDocument => esDocument._source)
      .sort((m1, m2) => (m1.name > m2.name) ? 1 : -1);
  };

  return (
    <>
      <Filters primaryColor={colorName} hasData={!!currentInstance}>
        <div className="center-col">
          <Title
            primaryColor={colorName}
            title={<span>Neuronal <br/> Morphology</span>}
            subtitle="Experimental Data"
            hint="Select a layer of interest in the S1 of the rat brain."
          />
          <div className="mb-4">
            <InfoBox>
              <p>Biocytin-filled neurons are 3D-reconstructed using Neurolucida and classified into diverse morphological types (m-types). Each m-type has several instances of reconstructed axonal and dendritic morphologies. Using a combination of objective classification methods for pyramidal cell types, and subjective classification for interneuron types, we have identified 57 m-types in the primary rat Somatosensory Cortex.</p>
            </InfoBox>
          </div>
        </div>
        <div className="center-col">
          <ComboSelector
            selectorTitle="1. Choose a layer"
            selector={
              <LayerAnatomySelector
                color={colorName}
                activeLayer={currentLayer}
                onLayerSelected={setLayer}
              />
            }
            listsTitle="2. Select reconstruction"
            list1={
              <List
                list={mtypes}
                value={currentMtype}
                title="m-type"
                color={colorName}
                onSelect={setMtype}
              />
            }
            list2={
              <List
                list={instances}
                value={currentInstance}
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
        <Collapsible title="Population">
          <h3>Factsheet</h3>
          <p>TBD</p>

          <h3 className="mt-3">Distribution</h3>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <ImageViewer src={`${basePath}/assets/images/population-distribution-1.png`} />
            </div>
            <div className="col-xs-12 col-sm-6">
              <ImageViewer src={`${basePath}/assets/images/population-distribution-2.png`} />
            </div>
          </div>

          <h3 className="mt-3">Reconstructed morphologies</h3>
          <p>Data are provided as ASCII files containing 3D representations of neuronal morphologies - axons and dendrites - whose shapes are traced and reconstructed using Neurolucida (neuron tracing, reconstruction, and analysis software).</p>
          <ESData query={mtypeExpMorphologyListDataQuery(currentMtype)}>
            {esDocuments => (
              <>
                {!!esDocuments &&
                  <ExpMorphologyTable
                    morphologies={getAndSortMorphologies(esDocuments)}
                  />
                }
              </>
            )}
          </ESData>
        </Collapsible>

        <Collapsible
          className="mt-4 mb-4"
          title={`Neuron Morphology ${currentMtype} ${currentInstance}`}
        >
          <ESData
            query={morphologyDataQuery(currentMtype, currentInstance)}
          >
            {esDocuments => (
              <>
                {!!esDocuments && (
                  <div>
                    <h2>3D view</h2>
                    <NexusPlugin
                      className="mt-2"
                      name="neuron-morphology"
                      resource={esDocuments[0]._source}
                      nexusClient={nexus}
                    />
                    <div className="text-right mt-2">
                      <NexusFileDownloadButton
                        filename={getMorphologyDistribution(esDocuments[0]._source).name}
                        url={getMorphologyDistribution(esDocuments[0]._source).contentUrl}
                        org={sscx.org}
                        project={sscx.project}
                      >
                        Download morphology
                      </NexusFileDownloadButton>
                    </div>
                  </div>
                )}
              </>
            )}
          </ESData>

          <HttpData path={expMorphologyFactsheetPath(currentInstance)}>
            {factsheetData => (
              <div className="mt-3">
                <h2>Morphometrics</h2>
                <Factsheet className="mt-2" facts={factsheetData[0].values} />
              </div>
            )}
          </HttpData>

          <HttpData path={expMorphMemodelsPath(currentInstance)}>
            {memodels => (
              <div className="mt-3">
                <h2>Morpho-Electrical neuron models using this morphology</h2>
                <ExpMorphMemodelList className="mt-2" memodels={memodels} />
              </div>
            )}
          </HttpData>
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default NeuronExperimentalMorphology;
