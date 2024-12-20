import React, { useState } from 'react';
import { Spin, Tabs } from 'antd';

import SynapticPathwaysTemplates from '@/templates/SynapticPathways';
import {
  pathwayFactsheetPath,
  synapticPhysiologyPlotPath as physiologyPlotPath,
  synapticAnatomyPlotPath as anatomyPlotPath,
  connectionViewerDataPath,
} from '@/queries/http';
import DataContainer from '@/components/DataContainer';
import HttpData from '@/components/HttpData';
import Factsheet from '@/components/Factsheet';
import HttpDownloadButton from '@/components/HttpDownloadButton';
import { color, sectionTitle } from './config';
import { downloadAsJson } from '@/utils';
import Collapsible from '@/components/Collapsible';
import Synaptome from '@/components/Synaptome';
import MtypeLegend from '@/components/MtypeLegend';
import ConnectionViewer from '@/components/ConnectionViewer';

import ImageViewer from '@/components/ImageViewer';
import styles from './synaptic-pathways.module.scss';
// import SimulationSection from '../../components/SimulationSection';


const Plot: React.FC<{ src: string }> = ({ src }) => (
  <ImageViewer
    border
    src={src}
    thumbnailSrc={src.replace('.png', '__w640.png')}
    aspectRatio="5 / 4"
  />
);

const RecSynPathwaysView = () => {
  const [connViewerReady, setConnViewerReady] = useState<boolean>(false);

  return (
    <SynapticPathwaysTemplates
      color={color}
      sectionTitle={sectionTitle}
    >
      {(subregion, pathway) => (
        <DataContainer
          visible={!!pathway}
          navItems={[
            { id: 'pathwaySection', label: 'Pathway' },
            { id: 'synaptomeSection', label: 'Synaptomes' },
            // { id: 'simulationSection', label: 'Simulations' },
          ]}
        >
          <Collapsible
            id="pathwaySection"
            title={`Pathway ${pathway}`}
          >
            <HttpData path={pathwayFactsheetPath(subregion, pathway)}>
              {(data, loading) => (
                <Spin spinning={loading}>
                  {data && (
                    <>
                      <h3 className="mb-2">Anatomy</h3>
                      <Factsheet id="pathwayAnatomyFactsheet" facts={data[0].values} />

                      {/* <h3 className="mt-3 mb-2">Physiology</h3>
                      <Factsheet id="pathwayPhysiologyFactsheet" className="mb-3" facts={data[1].values} /> */}

                      <div className="text-right mt-2 mb-3">
                        <HttpDownloadButton
                          // href={pathwayFactsheetPath(subregion, pathway)}
                          // download={`pathway-factsheet-${subregion}-${pathway}.json`}
                          onClick={() => {
                            downloadAsJson(data[0], `pathway-anatomy-factsheet-${subregion}-${pathway}.json`)
                          }}
                        >
                          factsheet
                        </HttpDownloadButton>
                      </div>
                    </>
                  )}
                </Spin>
              )}
            </HttpData>

            <h3>Synaptic anatomy</h3>
            <div className="row mt-1">
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'synapses_per_connection')} />
              </div>
            </div>
            <div className="row mt-1 mb-4">
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'axonal_branch_order')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'axonal_path_distance')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'neuronal_divergence')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'synaptic_divergence')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'dendritic_branch_order')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'dendritic_path_distance')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'neuronal_convergence')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'synaptic_convergence')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={anatomyPlotPath(subregion, pathway, 'afferent_synapse_count')} />
              </div>
            </div>

            <h3>Synaptic physiology</h3>
            <div className="row center-xs mt-1 mb-4">
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={physiologyPlotPath(subregion, pathway, 'amplitude')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={physiologyPlotPath(subregion, pathway, 'onset_latency')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={physiologyPlotPath(subregion, pathway, 'rise_time')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={physiologyPlotPath(subregion, pathway, 'decay_time')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={physiologyPlotPath(subregion, pathway, 'transmission_failures')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={physiologyPlotPath(subregion, pathway, 'coefficient_variation')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={physiologyPlotPath(subregion, pathway, 'failures_vs_amplitudes')} />
              </div>
              <div className="col-xs-6 col-sm-3 mt-2">
                <Plot src={physiologyPlotPath(subregion, pathway, 'CV_vs_amplitudes')} />
              </div>
            </div>

            <h3>Exemplar connection {pathway}</h3>
            <Tabs items={[
              {
                label: 'Static render',
                key: 'staticRender',
                className: styles.exemplarConnectionContainer,
                children: (
                  <Synaptome
                    type="pathway"
                    region={subregion}
                    pathway={pathway}
                  />
                ),
                },
                {
                  label: '3D view',
                  key: '3DView',
                  className: styles.exemplarConnectionContainer,
                  children: (
                    <HttpData path={connectionViewerDataPath(subregion, pathway)}>
                      {(data, loading) => (
                        <Spin spinning={loading || !connViewerReady}>
                          <ConnectionViewer
                            data={data}
                            onReadyStateChange={setConnViewerReady}
                          />
                        </Spin>
                      )}
                    </HttpData>
                  ),
                }]}>
            </Tabs>
          </Collapsible>

          <Collapsible
            id="synaptomeSection"
            className="mt-3"
            title="Synaptomes"
          >
            <p className="mb-3">
              The SSCx reconstruction makes it possible to predict the full complement of synaptic inputs and outputs
              for any given neuron.
            </p>
            <Synaptome
              type="pre"
              region={subregion}
              pathway={pathway}
            />
            <Synaptome
              className="mt-3"
              type="post"
              region={subregion}
              pathway={pathway}
            />

            <MtypeLegend className="mt-3" />
          </Collapsible>

          {/* <SimulationSection /> */}
        </DataContainer>
      )}
    </SynapticPathwaysTemplates>
  )
};

export default RecSynPathwaysView;
