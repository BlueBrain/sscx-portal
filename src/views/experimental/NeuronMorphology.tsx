import React from 'react';
import { useRouter } from 'next/router';
import { useNexusContext } from '@bbp/react-nexus';
import { Row, Col } from 'antd';

import ESData from '../../components/ESData';
import HttpData from '../../components/HttpData';
import HttpDownloadButton from '../../components/HttpDownloadButton';
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
import { StickyContainer } from '../../components/StickyContainer';
import { sscx } from '../../config';
import { defaultSelection } from '../../constants';

import selectorStyle from '../../styles/selector.module.scss';

const NeuronExperimentalMorphology: React.FC = () => {
  const router = useRouter();
  const nexus = useNexusContext();

  const { query } = router;
  if (!query.layer && !query.mtype && !query.instance) {
    const defaultMorphologyFilters = defaultSelection.experimentalData.neuronMorphology;
    query.layer = defaultMorphologyFilters.LAYER;
    query.mtype = defaultMorphologyFilters.M_TYPE;
    query.instance = defaultMorphologyFilters.INSTANCE;
  }

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

  const mtypes = currentLayer
    ? Object.keys(expMorphologyData[currentLayer]).sort() as string[]
    : [];

  const setMtype = (mtype: string) => {
    setQuery({
      layer: currentLayer,
      mtype,
      instance: null,
    });
  };
  const currentMtype: string = query.mtype as string;

  const instances = currentMtype
    ? (expMorphologyData as any)[currentLayer][currentMtype].sort()
    : [];

  const setInstance = (instance: string) => {
    setQuery({
      layer: currentLayer,
      mtype: currentMtype,
      instance,
    });
  };
  const currentInstance: string = query.instance as string;

  const getMorphologyDistribution = (morphologyResource: any) => (
    morphologyResource.distribution.find((d: any) => d.name.match(/\.asc$/i))
  );

  const getAndSortMorphologies = (esDocuments) => (
    esDocuments
      .map(esDocument => esDocument._source)
      .sort((m1, m2) => ((m1.name > m2.name) ? 1 : -1))
  );

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentInstance}>
        <Row
          className="w-100"
          gutter={[0, 20]}
        >
          <Col
            xs={24}
            xl={8}
            xxl={12}
          >
            <StickyContainer>
              <Title
                primaryColor={color}
                title={<span>Neuronal <br /> Morphology</span>}
                subtitle="Experimental Data"
                hint="Select a layer of interest in the S1 of the rat brain."
              />
              <InfoBox>
                <p>
                  Neurons comprise complex and highly-branched morphologies of axons and dendrites.
                  Axo-dendritic morphological structure determines the connectivity and biophysical properties of neurons.
                  The 3D geometry of axons and dendrites is reconstructed using specific experimental procedures to
                  classify neurons into diverse morphological types (m-types). Each m-type has several instances of
                  reconstructed axonal and dendritic morphologies. Using a combination of objective classification methods for
                  pyramidal cell types, and subjective classification for interneuron types,
                  we have identified 60 m-types in the primary rat Somatosensory Cortex.
                </p>
              </InfoBox>
            </StickyContainer>
          </Col>
          <Col
            className={`set-accent-color--${color}`}
            xs={24}
            xl={16}
            xxl={12}
          >
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>1. Select a layer</div>
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
                  <div className={selectorStyle.topFrameComponent}>
                    <List
                      block
                      list={mtypes}
                      value={currentMtype}
                      title="m-type"
                      color={color}
                      onSelect={setMtype}
                    />
                  </div>
                  <div className={selectorStyle.bottomFrameComponent}>
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

      <DataContainer
        visible={!!currentInstance}
        navItems={[
          { id: 'morphologySection', label: 'Morphology' },
          { id: 'mtypeSection', label: 'M-type' },
        ]}
      >
        <Collapsible
          id="morphologySection"
          className="mb-4"
          title={`Neuron Morphology ${currentInstance}`}
        >
          <p>
            The 3D representations of neuronal morphologies - axons and dendrites - are traced
            and reconstructed using Neurolucida (neuron tracing, reconstruction, and analysis software).
            Data for neuronal morphologies are provided as ASCII files.
          </p>
          <ESData
            query={morphologyDataQuery(currentMtype, currentInstance)}
          >
            {esDocuments => (
              <>
                {!!esDocuments && !!esDocuments.length && (
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
                        morphology
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
                <div className="text-right mt-2">
                  <HttpDownloadButton
                    href={expMorphologyFactsheetPath(currentInstance)}
                    download={`exp-morphology-factsheet-${currentInstance}.json`}
                  >
                    factsheet
                  </HttpDownloadButton>
                </div>
              </div>
            )}
          </HttpData>

          <HttpData path={expMorphMemodelsPath(currentInstance)}>
            {memodels => (
              <div className="mt-3">
                <h3>Morpho-Electrical neuron models using this morphology</h3>
                {memodels.length ? (
                  <ExpMorphMemodelList id="expMorphMemodelList" className="mt-2" memodels={memodels} />
                ) : (
                  <p>No models were built using this morphology</p>
                )}
              </div>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible
          id="mtypeSection"
          title={`M-Type ${currentMtype}`}
        >
          <p>
            Neuron morphologies were obtained from digital 3D reconstructions of biocytin-stained neurons from juvenile
            rat hind-limb somatosensory cortex, following whole-cell patch-clamp recordings in 300-μm-thick brain slices.
            This procedure enabled the reconstruction of shapes of axons, which were classified into 60 morphological types (m-types).
          </p>
          <HttpData path={expMorphPopulationFactesheetPath(currentMtype)}>
            {factsheetData => (
              <div>
                <h3>Factsheet</h3>
                <Factsheet facts={factsheetData.values} />
                <div className="text-right mt-2">
                  <HttpDownloadButton
                    href={expMorphPopulationFactesheetPath(currentMtype)}
                    download={`exp-morphology-population-factsheet-${currentMtype}.json`}
                  >
                    factsheet
                  </HttpDownloadButton>
                </div>
              </div>
            )}
          </HttpData>

          <ExpMorphDistribution className="mt-3" mtype={currentMtype} />

          <h3 className="mt-3">Reconstructed morphologies</h3>
          <ESData query={mtypeExpMorphologyListDataQuery(currentMtype)}>
            {esDocuments => (
              <>
                {!!esDocuments && (
                  <ExpMorphologyTable
                    layer={currentLayer}
                    mtype={currentMtype}
                    morphologies={getAndSortMorphologies(esDocuments)}
                  />
                )}
              </>
            )}
          </ESData>
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default NeuronExperimentalMorphology;
