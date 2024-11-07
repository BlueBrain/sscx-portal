import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import range from 'lodash/range';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

import { useRouter } from 'next/router';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Tabs, Row, Col, Spin } from 'antd';
import { useNexusContext } from '@bbp/react-nexus';

import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import HttpDownloadButton from '../components/HttpDownloadButton';
import NexusFileDownloadButton from '../components/NexusFileDownloadButton';
import Filters from '../layouts/Filters';
import Pills from '../components/Pills';
import HttpData from '../components/HttpData';
import DataContainer from '../components/DataContainer';
import LayerSelector from '../components/MicrocircuitLayerSelector';
import List from '../components/List';
import Collapsible from '../components/Collapsible';
import MemodelExpMorphList from '../components/MemodelExpMorphList';
import QuickSelector from '../components/QuickSelector';
import EtypeFactsheet from '../components/EtypeFactsheet';
import Factsheet from '../components/Factsheet';
import MorphHistogram from '../components/MorphHistogram';
import VideoPlayer from '../components/VideoPlayer';
import NeuronMorphology from '../components/NeuronMorphology';
import ESData from '../components/ESData';
import NexusPlugin from '../components/NexusPlugin';
import { Subregion, Layer, Color } from '../types';
import {
  mtypeFactsheetPath,
  etypeFactsheetPath,
  metypeFactsheetPath,
  bapMoviePath,
  epspMoviePath,
  modelExpMorphologiesPath,
  memodelNumberExceptionsPath,
  memodelIndexPath,
  memodelMorphologyPath,
  memodelArchivePath,
} from '../queries/http';
import { nexus as nexusConfig, basePath } from '../config';
import { downloadAsJson } from '@/utils';
import StickyContainer from '../components/StickyContainer';
import { modelSimTraceByNameDataQuery, modelEphysByNamesDataQuery } from '../queries/http';
import { defaultSelection, layers, subregions } from '../constants';

import selectorStyle from '../styles/selector.module.scss';


const { TabPane } = Tabs;


export type NeuronsTemplateProps = {
  color: Color;
  sectionTitle: string;
  factsheetPath: (pathway: string) => string;
  children: (data: any, title: string, pathway: string) => React.ReactNode;
};


const expEphysPageUrl = (etype: string, instance: string) => (
  [
    '/experimental-data/neuron-electrophysiology/?',
    new URLSearchParams({
      etype,
      etype_instance: instance,
    }).toString(),
  ].join('')
);

const Neurons: React.FC<NeuronsTemplateProps> = ({
  sectionTitle,
  color,
  children,
}) => {
  const router = useRouter();
  const nexus = useNexusContext();

  const [memodelIndex, setMemodelIndex] = useState<any>(null);
  const [memodelNumberExceptions, setMemodelNumberExceptions] = useState<any>(null);

  const { brain_region: region, layer, etype, mtype, memodel } = router.query as Record<string, string>;

  const [quickSelection, setQuickSelection] = useState<Record<string, string>>({ region, layer, etype, mtype, memodel });

  const setParams = (params: Record<string, string>): void => {
    const query = { ...router.query, ...params };
    router.push({ query }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (!router.query.brain_region) {
      const query = defaultSelection.digitalReconstruction.neurons;
      const { brain_region: region, layer, etype, mtype, memodel } = query;
      setQuickSelection({ region, layer, etype, mtype, memodel });
      router.replace({ query }, undefined, { shallow: true });
    } else {
      setQuickSelection({ region, layer, etype, mtype, memodel });
    }
  }, [router.query]);

  const setRegion = (region: Subregion) => {
    setParams({
      'brain_region': region,
      mtype: null,
      etype: null,
      memodel: null,
    });
  };
  const setQsRegion = (region) => {
    const { layer } = quickSelection;
    setQuickSelection({ region , layer });
  }

  const setLayer = (layer: Layer) => {
    setParams({
      layer,
      mtype: null,
      etype: null,
      memodel: null,
    });
  };
  const setQsLayer = (layer) => {
    const { region } = quickSelection;
    setQuickSelection({ region, layer });
  };

  const setMtype = (mtype: string) => {
    setParams({
      mtype,
      etype: null,
      memodel: null,
    });
  };
  const setQsMtype = (mtype) => {
    const { region, layer } = quickSelection;
    setQuickSelection({ region, layer, mtype });
  };

  const setEtype = (etype: string) => {
    setParams({
      etype,
      memodel: null,
    });
  };
  const setQsEtype = (etype) => {
    const { region, layer, mtype } = quickSelection;
    setQuickSelection({ region, layer, mtype, etype });
  }

  const setMemodel = (memodel: string) => {
    setParams({ memodel });
  };
  const setQsMemodel = (memodel) => {
    const { region, layer, mtype, etype } = quickSelection;
    setQuickSelection({ region, layer, mtype, etype, memodel });
    setParams({
      brain_region: region,
      layer,
      mtype,
      etype,
      memodel
    });
  };

  const getMtypes = (region, layer) => {
    if (!memodelIndex || !region || !layer) return [];

    return Object.keys(memodelIndex[region])
      .filter(mtype => layer.match(/\d+/)[0].includes(mtype.match(/\d+/)[0]))
      .sort();
  };

  const mtypes = getMtypes(region as Subregion, layer as Layer);
  const qsMtypes = getMtypes(quickSelection.region, quickSelection.layer);

  const getEtypes = (region, mtype: string) => {
    if (!memodelIndex || !region || !mtype) return [];

    return memodelIndex[region][mtype].sort()
  };

  const etypes = getEtypes(region, mtype);
  const qsEtypes = getEtypes(quickSelection.region, quickSelection.mtype);

  const getMemodels = (region, mtype, etype) => {
    if (!memodelIndex || !memodelNumberExceptions || !region || !mtype || !etype) return [];

    return range(1, get(memodelNumberExceptions, `${mtype}.${etype}.${region}`, 5) + 1)
      .map(idx => `${mtype}_${etype}_${idx}`)
  };

  const memodels = getMemodels(region, mtype, etype);
  const qsMemodels = getMemodels(quickSelection.region, quickSelection.mtype, quickSelection.etype);

  useEffect(() => {
    if (memodelIndex) return;

    fetch(memodelNumberExceptionsPath)
      .then(res => res.json())
      .then(memodelNumberExceptions => setMemodelNumberExceptions(memodelNumberExceptions))
      .then(() => fetch(memodelIndexPath))
      .then(res => res.json())
      .then(memodelIndex => setMemodelIndex(memodelIndex));
  }, []);

  const getEphysDistribution = (resource: any) => Array.isArray(resource.distribution)
    ? resource.distribution.find((d: any) => d.name.match(/\.nwb$/i))
    : resource.distribution;

  return (
    <>
      <Filters primaryColor={color} hasData={!!memodel}>
        <Row
          className="w-100"
          gutter={[0, 20]}
        >
          <Col
            className="mb-2"
            xs={24}
            xl={8}
            xxl={12}
          >
            <StickyContainer>
              <Title
                primaryColor={color}
                title="Neurons"
                subtitle={sectionTitle}
              />
              <div>
                <InfoBox>
                  <p>
                    We labeled single neurons with biocytin to stain their axonal and dendritic morphologies
                    to enable their 3D reconstruction and their objective classification
                    into morphological types (m-types). In addition, we also characterised the electrical firing patterns
                    of these neurons to different intensities of step currents injected in the soma
                    to group their response into electrical types (e-types).
                    We then mapped the e-types expressed in each m-type
                    to account for the observed diversity of morpho-electrical subtypes (me-types).
                  </p>
                </InfoBox>
              </div>
            </StickyContainer>
          </Col>

          <Col
            className={`set-accent-color--${color} mb-2`}
            xs={24}
            xl={16}
            xxl={12}
          >
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>1. Select a subregion</div>
                <div className={selectorStyle.body} style={{ padding: '0 0.5rem 1rem 0.5rem' }}>
                  <Pills
                    list={['S1DZ', 'S1DZO', 'S1FL', 'S1HL', 'S1J', 'S1Sh', 'S1Tr', 'S1ULp']}
                    value={region}
                    onSelect={setRegion as (s: string) => void}
                    color={color}
                  />
                </div>
              </div>
            </div>
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>2. Select a layer</div>
                <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '2rem 4rem' }}>
                  <LayerSelector
                    color={color}
                    value={layer as Layer}
                    onSelect={setLayer}
                  />
                </div>
              </div>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>3. Select an ME-model</div>
                <div className={selectorStyle.body}>
                  <div className={selectorStyle.topFrameComponent}>
                    <Row className="w-100">
                      <Col xs={24} sm={12}>
                        <List
                          title="M-type"
                          block
                          list={mtypes}
                          value={mtype}
                          onSelect={setMtype}
                          color={color}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <List
                          title="E-type"
                          block
                          color={color}
                          list={etypes}
                          value={etype}
                          onSelect={setEtype}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className={selectorStyle.bottomFrameComponent}>
                    <List
                      title="ME-model"
                      block
                      color={color}
                      list={memodels}
                      value={memodel}
                      onSelect={setMemodel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Filters>

      <QuickSelector
        color={color}
        entries={[
          {
            title: 'Subregion',
            currentValue: quickSelection.region,
            values: subregions,
            onChange: setQsRegion,
            width: '100px',
          },
          {
            title: 'Layer',
            currentValue: quickSelection.layer,
            values: layers,
            onChange: setQsLayer,
            width: '100px',
          },
          {
            title: 'M-type',
            currentValue: quickSelection.mtype,
            values: qsMtypes,
            onChange: setQsMtype,
            width: '100px',
          },
          {
            title: 'E-type',
            currentValue: quickSelection.etype,
            values: qsEtypes,
            onChange: setQsEtype,
            width: '100px',
          },
          {
            title: 'ME-model',
            currentValue: quickSelection.memodel,
            values: qsMemodels,
            onChange: setQsMemodel,
            width: '180px',
          },
        ]}
      />

      <DataContainer
        visible={!!memodel}
        navItems={[
          { id: 'memodelSection', label: 'ME-model' },
          { id: 'mtypeSection', label: 'M-type' },
          { id: 'etypeSection', label: 'E-type' },
        ]}
      >
        <Collapsible
          id="memodelSection"
          title={`ME-model Instance ${region} ${memodel}`}
        >
          <HttpData path={metypeFactsheetPath(region, mtype, etype, memodel)}>
            {(data, loading) => (
              <Spin spinning={loading}>
                {data && (
                  <>
                    <p className="mb-3">
                      Each m-type expresses a certain proportion of various e-types,
                      giving rise to a diversity of morpho-electrical subtypes (me-types).
                    </p>

                    <h3>Anatomy</h3>
                    <Factsheet id="memodelAnatomyFactsheet" facts={data[0].values} />

                    {/* <h3 className="mt-3">Physiology</h3> */}
                    {/* <Factsheet id="memodelPhysiologyFactsheet" facts={data[1].values} /> */}

                    <div className="text-right mt-2 mb-3">
                      <HttpDownloadButton
                        // href={metypeFactsheetPath(region, mtype, etype, memodel)}
                        // download={`memodel-factsheet-${region}-${memodel}.json`}
                        onClick={() => {
                          downloadAsJson(data[0], `memodel-anatomy-factsheet-${region}-${memodel}.json`)
                        }}
                      >
                        factsheet
                      </HttpDownloadButton>
                    </div>

                    <h3 className="mt-3">Model morphology</h3>
                    <NeuronMorphology path={memodelMorphologyPath(data[2].value)} />

                    <div className="text-right mt-2">
                      <HttpDownloadButton
                        href={memodelArchivePath(region, mtype, etype, memodel)}
                        download
                      >
                        model
                      </HttpDownloadButton>
                    </div>

                    <HttpData path={modelSimTraceByNameDataQuery(region, memodel)}>
                      {(simTrace, loading) => (
                        <Spin spinning={loading}>
                          {simTrace && (
                            <div className="mt-3">
                              <h3>ME-model simulation traces</h3>
                              <NexusPlugin
                                name="neuron-electrophysiology"
                                resource={simTrace}
                                nexusClient={nexus}
                              />
                              <div className="row start-xs end-sm mt-2 mb-2">
                                <div className="col-xs">
                                  <Button
                                    className="mr-1"
                                    type="dashed"
                                    icon={<QuestionCircleOutlined />}
                                    href={`${basePath}/tutorials/nwb/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="small"
                                  >
                                    How to read NWB files
                                  </Button>
                                  <NexusFileDownloadButton
                                    filename={getEphysDistribution(simTrace).name}
                                    url={getEphysDistribution(simTrace).contentUrl}
                                    org={nexusConfig.org}
                                    project={nexusConfig.project}
                                    id="ephysDownloadBtn"
                                  >
                                    trace
                                  </NexusFileDownloadButton>
                                </div>
                              </div>
                            </div>
                          )}
                        </Spin>
                      )}
                    </HttpData>

                    <HttpData path={modelExpMorphologiesPath(region, mtype, etype, memodel)}>
                      {(expMorphologies, loading) => (
                        <Spin spinning={loading}>
                          {expMorphologies && (
                            <div className="mt-3">
                              <h3>Experimental morphologies used for this model</h3>
                              <MemodelExpMorphList morphologies={expMorphologies} />
                            </div>
                          )}
                        </Spin>
                      )}
                    </HttpData>

                    <div className="row mt-3">
                      <div className="col-xs-12 col-sm-6 mt-1">
                        <h3>EPSP Attenuation</h3>
                        <VideoPlayer
                          sources={[{
                            src: epspMoviePath(region, mtype, etype, data[2].value),
                            type: 'video/mp4',
                            size: 1080,
                          }]}
                        />
                      </div>
                      <div className="col-xs-12 col-sm-6 mt-1">
                        <h3>bAP Attenuation</h3>
                        <VideoPlayer
                          sources={[{
                            src: bapMoviePath(region, mtype, etype, data[2].value),
                            type: 'video/mp4',
                            size: 1080,
                          }]}
                        />
                      </div>
                    </div>
                  </>
                )}
              </Spin>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible
          id="mtypeSection"
          className="mt-4"
          title={`M-Type ${mtype}`}
        >
          <HttpData path={mtypeFactsheetPath(region, mtype)}>
            {(data, loading) => (
              <Spin spinning={loading}>
                {data && (
                  <>
                    <p className="mb-3">
                      Neurons are objectively classified into m-types based on the shapes of their axons and dendrites.
                    </p>

                    <h3>Anatomy</h3>
                    <Factsheet id="mtypeAnatomyFactsheet" facts={data[0].values} />

                    <h3 className="mt-3">Physiology</h3>
                    <Factsheet id="mtypePhysiologyFactsheet" facts={data[1].values} />

                    <div className="text-right mt-3">
                      <HttpDownloadButton
                        href={mtypeFactsheetPath(region, mtype)}
                        download={`mtype-factsheet-${region}-${mtype}.json`}
                      >
                        factsheet
                      </HttpDownloadButton>
                    </div>

                    <MorphHistogram className="mt-4" region={region} mtype={mtype} />
                  </>
                )}
              </Spin>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible
          id="etypeSection"
          className="mt-4"
          title={`E-Type ${etype}`}
        >
          <HttpData path={etypeFactsheetPath(region, mtype, etype, memodel)}>
            {(data, loading) => (
              <Spin spinning={loading}>
                {data && (
                  <>
                    <p className="mb-3">
                      Neurons are classified into e-types based on their electrical response properties
                      to step current injections at the soma.
                    </p>
                    <EtypeFactsheet id="etypeFactsheet" data={data} />
                    <div className="text-right mt-3 mb-3">
                      <HttpDownloadButton
                        href={etypeFactsheetPath(region, mtype, etype, memodel)}
                        download={`etype-factsheet-${region}-${memodel}.json`}
                      >
                        factsheet
                      </HttpDownloadButton>
                    </div>

                    <h3>Experimental traces used for model fitting</h3>
                    <HttpData path={modelEphysByNamesDataQuery(data[4].value)}>
                      {(expTraces, loading) => (
                        <Spin spinning={loading}>
                          {expTraces && (
                            <h4 className="mt-1">This model is based on data from {expTraces.length} cells.</h4>
                          )}
                          <Tabs
                            id={expTraces && expTraces.length ? 'modelFittingEphys' : null}
                            className="mt-3"
                            type="card"
                          >
                            {expTraces && sortBy(expTraces, '.name').map(expTraces => (
                              <TabPane key={expTraces.name} tab={expTraces.name}>
                                <div style={{ minHeight: '600px' }}>
                                  <p className="mt-2 mb-3">
                                    Full experimental instance (with all traces): &nbsp;
                                    <Link
                                      href={expEphysPageUrl(etype, expTraces.name)}
                                      prefetch={false}
                                    >
                                      {expTraces.name}
                                    </Link>
                                  </p>

                                  <div className="row start-xs end-sm mt-2 mb-2">
                                    <div className="col-xs">
                                      <Button
                                        className="mr-1"
                                        type="dashed"
                                        icon={<QuestionCircleOutlined />}
                                        href={`${basePath}/tutorials/nwb/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        size="small"
                                      >
                                        How to read NWB files
                                      </Button>
                                      <NexusFileDownloadButton
                                        filename={getEphysDistribution(expTraces).name}
                                        url={getEphysDistribution(expTraces).contentUrl}
                                        org={nexusConfig.org}
                                        project={nexusConfig.project}
                                      >
                                        trace
                                      </NexusFileDownloadButton>
                                    </div>
                                  </div>

                                  <NexusPlugin
                                    name="neuron-electrophysiology"
                                    resource={expTraces}
                                    nexusClient={nexus}
                                  />
                                </div>
                              </TabPane>
                            ))}
                          </Tabs>
                        </Spin>
                      )}
                    </HttpData>
                  </>
                )}
              </Spin>
            )}
          </HttpData>
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default Neurons;
