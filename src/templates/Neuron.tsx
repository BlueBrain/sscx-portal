import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import { lorem } from '../views/Styleguide';
import Filters from '../layouts/Filters';
import Pills from '../components/Pills';
import HttpData from '../components/HttpData';
import useQuery from '../hooks/useQuery';
import { Layer, Color } from '../types';
import { BrainRegion } from '../components/BrainRegionsSelector';
import ComboSelector from '../components/ComboSelector';
import MicrocircuitSelector from '../components/MicrocircuitSelector';
import List from '../components/List';
import { accentColors } from '../config';
import ScrollTo from '../components/ScrollTo';
import Collapsible from '../components/Collapsible';

import MtypeFactsheet from '../components/MtypeFactsheet';
import EtypeFactsheet from '../components/EtypeFactsheet';
import ImageViewer from '../components/ImageViewer';
import VideoPlayer from '../components/VideoPlayer';


export type NeuronsTemplateProps = {
  color: Color;
  sectionTitle: string;
  factsheetPath: (pathway: string) => string;
  children: (data: any, title: string, pathway: string) => React.ReactNode;
};

type PathwayMType = {
  pre: {
    [layer: string]: string[];
  };
  post: {
    [layer: string]: string[];
  };
}

const Neurons: React.FC<NeuronsTemplateProps> = ({
  sectionTitle,
  color,
  factsheetPath,
  children,
}) => {
  const query = useQuery();
  const history = useHistory();

  const addParam = (key: string, value: string): void => {
    query.set(key, value);
    history.push(`?${query.toString()}`);
  };

  const [layerMtypes, setLayerMtypes] = useState<any>(null);

  const currentRegion: BrainRegion = query.get('brain_region') as BrainRegion;
  const currentLayer: Layer = query.get('layer') as Layer;
  const currentEtype: string = query.get('etype') as string;
  const currentMtype: string = query.get('mtype') as string;
  const currentInstance: string = query.get('instance') as string;

  const setRegion = (region: BrainRegion) => addParam('brain_region', region);
  const setLayer = (layer: Layer) => addParam('layer', layer);
  const setEtype = (etype: string) => addParam('etype', etype);
  const setMtype = (mtype: string) => addParam('mtype', mtype);
  const setInstance = (instance: string) => addParam('instance', instance);

  const title = `Pathway fact sheet L5?`;

  useEffect(() => {
    fetch('/data/layer-mtypes.json')
      .then(res => res.json())
      .then(layerMtypes => setLayerMtypes(layerMtypes))
  }, []);

  const hasData = !!layerMtypes;

  return (
    <>
      <Filters primaryColor={color} hasData={!!hasData}>
        <div className="center-col">
          <Title
            primaryColor={color}
            title="Synaptic Pathways"
            subtitle={sectionTitle}
            hint="Select a subregion of interest in the S1 of the rat brain."
          />
          <div>
            <InfoBox title="Longer Text" text={lorem} color={color} />
            <br />
            <Pills
              title="1. Select a subregion"
              list={['S1FL', 'S1Sh', 'S1HL', 'S1Tr']}
              defaultValue={currentRegion}
              onSelect={setRegion}
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
                title="m-type"
                list={layerMtypes && currentLayer ? layerMtypes[currentLayer] : []}
                defaultValue={currentMtype}
                onSelect={setMtype}
                color={color}
              />
            }
            list2={
              <List
                title="e-type"
                list={['cADpyr', 'cAC', 'bAC', 'cNAC', 'bNAC', 'dNAC', 'cSTUT', 'bSTUT', 'dSTUT', 'cIR', 'bIR']}
                defaultValue={currentEtype}
                onSelect={setEtype}
                color="orange"
              />
            }
            list3={
              <List
                title="me-type instance"
                block
                list={[
                  'C231001B3_-_Scale_x1.000_y0.950_z1.000_-_Clone_0',
                  'sm100506a1-4_idB_-_Scale_x1.000_y0.975_z1.000_-_Clone_0',
                  'C120501A1_-_Clone_1',
                  'C080400C2_-_Scale_x1.000_y0.975_z1.000_-_Clone_0',
                  'C060400B2_-_Scale_x1.000_y1.050_z1.000_-_Clone_3'
                ]}
                defaultValue={currentInstance}
                onSelect={setInstance}
                color="orange"
              />
            }
            selectorTitle="2. Choose a layer"
            listsTitle="3. Choose mtype, etype and neuron instance"
            list1Open={!!currentLayer}
            list2Open={!!currentLayer}
            list3Open={!!currentMtype && !!currentEtype}
          />
        </div>
      </Filters>

      {/* <HttpData path={path}>
        {data => children(data, title, pathway)}
      </HttpData> */}

      {currentMtype && (
        <HttpData path={'/data/MTypes/L5_BTC/factsheet.json'}>
          {data => (
            <>
              <Collapsible title={`M-Type ${currentMtype} Factsheet`}>
                <MtypeFactsheet data={data} />

                <h4 className="mt-4">Axonal and dendritic distribution</h4>
                <div className="row">
                  <div className="col-xs-3">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/51766/dist_axon_bif_angle.png"/>
                  </div>
                  <div className="col-xs-3">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/51766/dist_axon_length.png"/>
                  </div>
                  <div className="col-xs-3">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/51766/dist_axon_sec_length.png"/>
                  </div>
                  <div className="col-xs-3">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/51766/dist_axon_volume.png"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-3">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/51766/dist_basal_bif_angle.png"/>
                  </div>
                  <div className="col-xs-3">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/51766/dist_basal_length.png"/>
                  </div>
                  <div className="col-xs-3">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/51766/dist_basal_sec_length.png"/>
                  </div>
                  <div className="col-xs-3">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/51766/dist_basal_volume.png"/>
                  </div>
                </div>
              </Collapsible>
            </>
          )}
        </HttpData>
      )}

      {currentEtype && (
        <HttpData path={'/data/emodel/cADpyr_L5TPC/factsheet.json'}>
          {data => (
            <>
              <Collapsible title={`E-Type ${currentEtype} Factsheet`}>
                <EtypeFactsheet data={data} />
              </Collapsible>
            </>
          )}
        </HttpData>
      )}

      {currentInstance && (
        <HttpData path={'/data/emodel/cADpyr_L5TPC/factsheet.json'}>
          {data => (
            <>
              <Collapsible title={`ME-Type Instance ${currentInstance} Factsheet`}>

              <h4>{currentInstance} data</h4>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/1921846/cADpyr_dend-C060114A2_axon-C060114A5.png" />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <ImageViewer src="https://bbp.epfl.ch/nmc-portal/documents/10184/1921846/_dend-C060114A2_axon-C060114A5_xy_.png" />
                  </div>
                </div>

                <h4 className="mt-4">EPSP Attenuation and bAP Attenuation</h4>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <VideoPlayer src="http://bbp.epfl.ch/project/media/nmc-portal/METypes/L5_TTPC1_cADpyr/dend-C060114A2_axon-C060114A5/epsp.mp4" />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <VideoPlayer src="http://bbp.epfl.ch/project/media/nmc-portal/METypes/L5_TTPC1_cADpyr/dend-C060114A2_axon-C060114A5/bap.mp4" />
                  </div>
                </div>
              </Collapsible>
            </>
          )}
        </HttpData>
      )}

      <div className="scroll-to">
        <ScrollTo anchor="filters" direction="up">
          Return to filters
        </ScrollTo>
      </div>
    </>
  );
};

export default Neurons;
