import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Tabs } from 'antd';
import { useNexusContext } from '@bbp/react-nexus';
import range from 'lodash/range';
import get from 'lodash/get';
import qs from 'querystring';

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
import ServerSideContext from '../context/server-side-context';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Filters from '../layouts/Filters';
import Pills from '../components/Pills';
import HttpData from '../components/HttpData';
import DataContainer from '../components/DataContainer';
import { Layer, Color } from '../types';
import { BrainRegion } from '../components/BrainRegionsSelector';
import ComboSelector from '../components/ComboSelector';
import MicrocircuitSelector from '../components/MicrocircuitSelector';
import List from '../components/List';
import { accentColors } from '../config';
import Collapsible from '../components/Collapsible';

import MtypeFactsheet from '../components/MtypeFactsheet';
import MemodelExpMorphList from '../components/MemodelExpMorphList';
import EtypeFactsheet from '../components/EtypeFactsheet';
import Factsheet from '../components/Factsheet';
import MorphHistogram from '../components/MorphHistogram';
import ImageViewer from '../components/ImageViewer';
import VideoPlayer from '../components/VideoPlayer';
import NeuronMorphology from '../components/NeuronMorphology';
import ESData from '../components/ESData';
import NexusPlugin from '../components/NexusPlugin';
import NexusFileDownloadButton from '../components/NexusFileDownloadButton';
import { morphologyDataQuery, modelEphysByNamesDataQuery } from '../queries/es';


const { TabPane } = Tabs;


export type NeuronsTemplateProps = {
  color: Color;
  sectionTitle: string;
  factsheetPath: (pathway: string) => string;
  children: (data: any, title: string, pathway: string) => React.ReactNode;
};


const expEphysPageUrl = (etype: string, instance: string) => {
  return [
    '/experimental-data/neuron-electrophysiology/?',
    qs.stringify({
      etype,
      etype_instance: instance,
    }),
  ].join('');
}

const Neurons: React.FC<NeuronsTemplateProps> = ({
  sectionTitle,
  color,
  children,
}) => {
  const router = useRouter();
  const nexus = useNexusContext();
  const serverSideContext = useContext(ServerSideContext);

  const query = { ...serverSideContext?.query, ...router?.query };

  const [memodelIndex, setMemodelIndex] = useState<any>(null);
  const [memodelNumberExceptions, setMemodelNumberExceptions] = useState<any>(null);

  const currentRegion: BrainRegion = query.brain_region as BrainRegion;
  const currentLayer: Layer = query.layer as Layer;
  const currentEtype: string = query.etype as string;
  const currentMtype: string = query.mtype as string;
  const currentMemodel: string = query.memodel as string;

  const setParams = (params: Record<string, string>): void => {
    const query = {
      ...{
        brain_region: currentRegion,
        layer: currentLayer,
        etype: currentEtype,
        mtype: currentMtype,
        memodel: currentMemodel,
      },
      ...params,
    };
    router.push({ query, pathname: router.pathname }, undefined, { shallow: true });
  };

  const setRegion = (region: BrainRegion) => {
    setParams({
      'brain_region': region,
      mtype: null,
      etype: null,
      memodel: null,
    });
  };
  const setLayer = (layer: Layer) => {
    setParams({
      layer,
      mtype: null,
      etype: null,
      memodel: null,
    })
  };
  const setMtype = (mtype: string) => {
    setParams({
      mtype,
      etype: null,
      memodel: null,
    })
  };
  const setEtype = (etype: string) => {
    setParams({
      etype,
      memodel: null,
    })
  };
  const setMemodel = (memodel: string) => {
    setParams({ memodel })
  };

  const mtypes = currentLayer && memodelIndex
    ? Object.keys(memodelIndex[currentRegion])
      .filter(mtype => currentLayer.match(/\d+/)[0].includes(mtype.match(/\d+/)[0]))
    : [];

  const etypes = currentMtype && memodelIndex
    ? memodelIndex[currentRegion][currentMtype]
    : [];

  const memodelMemodelRange = () => {
    return range(1, );
  }

  const memodels = currentEtype && memodelIndex
    ? range(1, get(memodelNumberExceptions, `${currentMtype}.${currentEtype}.${currentRegion}`, 5) + 1)
      .map(idx => `${currentMtype}_${currentEtype}_${idx}`)
    : [];

  const getMorphologyDistribution = (morphologyResource: any) => {
    return morphologyResource.distribution.find((d: any) => d.name.match(/\.asc$/i));
  };

  useEffect(() => {
    if (memodelIndex) return;

    fetch(memodelNumberExceptionsPath)
      .then(res => res.json())
      .then(memodelNumberExceptions => setMemodelNumberExceptions(memodelNumberExceptions))
      .then(() => fetch(memodelIndexPath))
      .then(res => res.json())
      .then(memodelIndex => setMemodelIndex(memodelIndex));
  }, []);

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentMemodel}>
        <div className="center-col">
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
                into morphological types (m-types). In addition, we also characterized the electrical firing patterns
                of these neurons to different intensities of step currents injected in the soma
                to group their response into electrical types (e-types).
                We then mapped the e-types expressed in each m-type
                to account for the observed diversity of morpho-electrical subtypes (me-types).
              </p>
            </InfoBox>
            <Pills
              className="mt-3"
              title="1. Select a subregion"
              list={['S1DZ', 'S1DZO', 'S1FL', 'S1HL', 'S1J', 'S1Sh', 'S1Tr', 'S1ULp']}
              defaultValue={currentRegion}
              onSelect={setRegion as (s: string) => void}
              color={color}
            />
          </div>
        </div>
        <div className="center-col">
          <ComboSelector
            selector={
              <MicrocircuitSelector
                color={accentColors[color]}
                defaultActiveLayer={currentLayer}
                onLayerSelected={setLayer}
                disabled={!currentRegion}
              />
            }
            list1={
              <List
                title="M-type"
                list={mtypes}
                value={currentMtype}
                onSelect={setMtype}
                color={color}
              />
            }
            list2={
              <List
                title="E-type"
                list={etypes}
                value={currentEtype}
                onSelect={setEtype}
                color="orange"
              />
            }
            list3={
              <List
                title="ME-model"
                block
                list={memodels}
                value={currentMemodel}
                onSelect={setMemodel}
                color="orange"
              />
            }
            selectorTitle="2. Choose a layer"
            listsTitle="3. Choose M-type, E-type and neuron model"
            list1Open={!!currentLayer}
            list2Open={!!currentMtype}
            list3Open={!!currentMtype && !!currentEtype}
          />
        </div>
      </Filters>

      <DataContainer visible={!!currentMemodel}>
        <Collapsible title={`ME-model ${currentMemodel} Factsheet`}>
          <HttpData path={metypeFactsheetPath(currentRegion, currentMtype, currentEtype, currentMemodel)}>
            {data => (
              <>
                <p className="mb-3">
                  Each m-type expresses a certain proportion of various e-types,
                  giving rise to a diversity of morpho-electrical subtypes (me-types).
                </p>
                <h3>Anatomy</h3>
                {data && (
                  <Factsheet id="memodelAnatomyFactsheet" facts={data[0].values}/>
                )}
                <h3 className="mt-3">Physiology</h3>
                {data && (
                  <Factsheet id="memodelPhysiologyFactsheet" facts={data[1].values}/>
                )}

                <h3 className="mt-3">Model morphology</h3>
                <NeuronMorphology path={memodelMorphologyPath(data[2].value)} />

                <div className="text-right mt-3">
                  <Button
                    type="primary"
                    download
                    href={memodelArchivePath(currentRegion, currentMtype, currentEtype, currentMemodel)}
                  >
                    Download model
                  </Button>
                </div>

                <HttpData path={modelExpMorphologiesPath(currentRegion, currentMtype, currentEtype, currentMemodel)}>
                  {expMorphologies => (
                    <div className="mt-3">
                      <h3>Experimental morphologies used for this model</h3>
                      <MemodelExpMorphList morphologies={expMorphologies} />
                    </div>
                  )}
                </HttpData>

                <div className="row mt-3">
                  <div className="col-xs-12 col-sm-6 mt-1">
                    <h3>EPSP Attenuation</h3>
                    <VideoPlayer
                      sources={[{
                        src: epspMoviePath(currentRegion, currentMtype, currentEtype, data[2].value),
                        type: 'video/mp4',
                        size: 1080,
                      }]}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 mt-1">
                    <h3>bAP Attenuation</h3>
                    <VideoPlayer
                      sources={[{
                        src: bapMoviePath(currentRegion, currentMtype, currentEtype, data[2].value),
                        type: 'video/mp4',
                        size: 1080,
                      }]}
                    />
                  </div>
                </div>
              </>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible title={`M-Type ${currentMtype} Factsheet`} className="mt-4">
          <HttpData path={mtypeFactsheetPath(currentRegion, currentMtype)}>
            {data => (
              <>
                <p className="mb-3">Neurons are objectively classified into m-types based on the shapes of their axons and dendrites.</p>

                <h3>Anatomy</h3>
                {data && <Factsheet id="mtypeAnatomyFactsheet" facts={data[0].values}/>}
                <h3 className="mt-3">Physiology</h3>
                {data && <Factsheet id="mtypePhysiologyFactsheet" facts={data[1].values}/>}

                <MorphHistogram className="mt-4" region={currentRegion} mtype={currentMtype} />
              </>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible className="mt-4" title={`E-Type ${currentEtype} Factsheet`}>
          <HttpData path={etypeFactsheetPath(currentRegion, currentMtype, currentEtype, currentMemodel)}>
            {data => (
              <>
                <p className="mb-3">
                  Neurons are classified into e-types based on their electrical response properties
                  to step current injections at the soma.
                </p>
                <EtypeFactsheet id="etypeFactsheet" data={data} />
                <div className="text-right mt-3 mb-3">
                  <Button
                    type="primary"
                    href={etypeFactsheetPath(currentRegion, currentMtype, currentEtype, currentMemodel)}
                    download
                  >
                    Download factsheet
                  </Button>
                </div>

                <h3>Experimental traces used for model fitting</h3>
                <ESData query={modelEphysByNamesDataQuery(data[4].value)}>
                  {esDocuments => (
                    <>
                      {esDocuments && (
                        <h4 className="mt-1">This model is based on data from {esDocuments.length} cells.</h4>
                      )}
                      <Tabs type="card" className="mt-3" id={esDocuments && esDocuments.length ? 'modelFittingEphys': null}>
                        {esDocuments && esDocuments.map(esDocument => (
                          <TabPane key={esDocument._source.name} tab={esDocument._source.name}>
                            <div style={{ minHeight: '600px' }}>
                              <p className="mt-2 mb-3">
                                Full experimental instance (with all traces): &nbsp;
                                <Link href={expEphysPageUrl(currentEtype, esDocument._source.name)}>
                                  {esDocument._source.name}
                                </Link>
                              </p>
                              <NexusPlugin
                                name="neuron-electrophysiology"
                                resource={esDocument._source}
                                nexusClient={nexus}
                              />
                            </div>
                          </TabPane>
                        ))}
                      </Tabs>
                    </>
                  )}
                </ESData>
              </>
            )}
          </HttpData>
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default Neurons;
