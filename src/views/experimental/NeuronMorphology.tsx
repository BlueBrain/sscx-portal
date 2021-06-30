import React from 'react';
import { useRouter } from 'next/router';
import { useNexusContext } from '@bbp/react-nexus';
import { Row, Col } from 'antd';

import ESData from '../../components/ESData';
import HttpData from '../../components/HttpData';
import DataContainer from '../../components/DataContainer';
import LayerSelector from '../../components/AnatomyLayerSelector';
import ExpMorphDistribution from '../../components/ExpMorphDistribution';
import { morphologyDataQuery, mtypeExpMorphologyListDataQuery } from '../../queries/es';
import { expMorphologyFactsheetPath, expMorphMemodelsPath, expMorphPopulationFactesheetPath } from '../../queries/http';

import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import NexusPlugin from '../../components/NexusPlugin';
import { color } from './config';
import { Layer } from '../../types';
import Collapsible from '../../components/Collapsible';
import List from '../../components/List';
import ExpMorphMemodelList from '../../components/ExpMorphMemodelList';
import expMorphologyData from '../../__generated__/exp-morphology-data.json';
import Factsheet from '../../components/Factsheet';
import ExpMorphologyTable from '../../components/ExpMorphologyTable';
import Metadata from '../../components/Metadata';
import NexusFileDownloadButton from '../../components/NexusFileDownloadButton';
import { sscx } from '../../config';

import selectorStyle from '../../styles/selector.module.scss';


const NeuronExperimentalMorphology: React.FC = () => {
  const router = useRouter();
  const nexus = useNexusContext();

  const { query } = router;

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
      <Filters primaryColor={color} hasData={!!currentInstance}>
        <Row
          className="w-100"
          align="bottom"
          gutter={16}
        >
          <Col
            xs={24}
            xl={8}
            xxl={12}
          >
            <Title
              primaryColor={color}
              title={<span>Neuronal <br/> Morphology</span>}
              subtitle="Experimental Data"
              hint="Select a layer of interest in the S1 of the rat brain."
            />
            <InfoBox>
              <p>
                Biocytin-filled neurons are 3D-reconstructed using Neurolucida and classified into
                diverse morphological types (m-types). Each m-type has several instances of reconstructed axonal
                and dendritic morphologies. Using a combination of objective classification methods for
                pyramidal cell types, and subjective classification for interneuron types,
                we have identified 57 m-types in the primary rat Somatosensory Cortex.
              </p>
            </InfoBox>
          </Col>
          <Col
            className={`set-accent-color--${color}`}
            xs={24}
            xl={16}
            xxl={12}
          >
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>1. Choose a layer</div>
                <div className={selectorStyle.body} style={{ padding: '2rem 4rem' }}>
                  <LayerSelector
                    color={color}
                    value={currentLayer}
                    onSelect={setLayer}
                  />
                </div>
              </div>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>2. Select a reconstruction</div>
                <div className={selectorStyle.body}>
                  <div style={{ backgroundColor: 'rgb(49, 50, 84)', padding: '1rem', margin: '1rem 1rem 1rem 0' }}>
                    <List
                      block
                      list={mtypes}
                      value={currentMtype}
                      title="m-type"
                      color={color}
                      onSelect={setMtype}
                    />
                  </div>
                  <div style={{ backgroundColor: 'rgb(49, 50, 84)', padding: '1rem 1rem 1rem 2rem', margin: '1rem 0 1rem 0' }}>
                    <List
                      block
                      list={instances}
                      value={currentInstance}
                      title="Reconstructed morphology"
                      color={color}
                      onSelect={setInstance}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Filters>

      <DataContainer visible={!!currentInstance}>
        <Collapsible
          className="mb-4"
          title={`Neuron Morphology ${currentInstance}`}
        >
          <ESData
            query={morphologyDataQuery(currentMtype, currentInstance)}
          >
            {esDocuments => (
              <>
                {!!esDocuments && (
                  <div>
                    <Metadata nexusDocument={esDocuments[0]._source} />
                    <h3 className="mt-3">3D view</h3>
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
                        id="morphologyDownloadBtn"
                      >
                        Download morphology
                      </NexusFileDownloadButton>
                    </div>
                  </div>
                )}
              </>
            )}
          </ESData>

          <HttpData path={expMorphologyFactsheetPath(currentInstance)} label="morphometrics">
            {factsheetData => (
              <div className="mt-3">
                <h3>Morphometrics</h3>
                <Factsheet id="morphometrics" className="mt-2" facts={factsheetData[0].values} />
              </div>
            )}
          </HttpData>

          <HttpData path={expMorphMemodelsPath(currentInstance)}>
            {memodels => (
              <div className="mt-3">
                <h3>Morpho-Electrical neuron models using this morphology</h3>
                <ExpMorphMemodelList id="expMorphMemodelList" className="mt-2" memodels={memodels} />
              </div>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible title={`Population ${currentMtype}`}>
          <h3>Factsheet</h3>
          <HttpData path={expMorphPopulationFactesheetPath(currentMtype)}>
            {factsheetData => (
              <Factsheet facts={factsheetData.values}/>
            )}
          </HttpData>

          <ExpMorphDistribution className="mt-3" mtype={currentMtype}/>

          <h3 className="mt-3">Reconstructed morphologies</h3>
          <p>
            Data are provided as ASCII files containing 3D representations of neuronal morphologies -
            axons and dendrites - whose shapes are traced and reconstructed using Neurolucida
            (neuron tracing, reconstruction, and analysis software).
          </p>
          <ESData query={mtypeExpMorphologyListDataQuery(currentMtype)}>
            {esDocuments => (
              <>
                {!!esDocuments &&
                  <ExpMorphologyTable
                    layer={currentLayer}
                    mtype={currentMtype}
                    morphologies={getAndSortMorphologies(esDocuments)}
                  />
                }
              </>
            )}
          </ESData>
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default NeuronExperimentalMorphology;
