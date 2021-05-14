import React from 'react';

import SynapticPathwaysTemplates from '../../templates/SynapticPathways';
import {
  pathwayFactsheetPath,
  synapticPhysiologyPlotPath as physiologyPlotPath,
  synapticAnatomyPlotPath as anatomyPlotPath,
} from '../../queries/http';
import DataContainer from '../../components/DataContainer';
import HttpData from '../../components/HttpData';
import Factsheet from '../../components/Factsheet';
import { colorName, sectionTitle } from './config';
import Collapsible from '../../components/Collapsible';
import Synaptome from '../../components/Synaptome';
import { imgOpt } from '../../utils';

import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';


const Plot: React.FC<{ url: string }> = ({ url }) => {
  return (
    <ImageViewer
      border
      src={url}
      thumbnailSrc={imgOpt(url, { width: 640 })}
      aspectRatio='5 / 4'
    />
  );
};

const RecSynPathwaysView = () => (
  <SynapticPathwaysTemplates
    color={colorName}
    sectionTitle={sectionTitle}
  >
    {(subregion, pathway) => (
      <DataContainer visible={!!pathway}>
        <Collapsible title={`Pathway ${pathway}`}>
          <HttpData path={pathwayFactsheetPath(subregion, pathway)}>
            {data => (
              <>
                <h3 className="mb-2">Anatomy</h3>
                {data && <Factsheet facts={data[0].values} />}
                <h3 className="mt-3 mb-2">Physiology</h3>
                {data && <Factsheet className="mb-3" facts={data[1].values} />}
              </>
            )}
          </HttpData>

          <h3>Synaptic anatomy</h3>
          <div className="row mt-1">
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'synapses_per_connection')} />
            </div>
          </div>
          <div className="row mt-1 mb-4">
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'axonal_branch_order')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'axonal_path_distance')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'neuronal_divergence')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'synaptic_divergence')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'dendritic_branch_order')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'dendritic_path_distance')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'neuronal_convergence')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'synaptic_convergence')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={anatomyPlotPath(subregion, pathway, 'afferent_synapse_count')} />
            </div>
          </div>

          <h3>Synaptic physiology</h3>
          <div className="row center-xs mt-1">
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={physiologyPlotPath(subregion, pathway, 'amplitude')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={physiologyPlotPath(subregion, pathway, 'onset_latency')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={physiologyPlotPath(subregion, pathway, 'rise_time')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={physiologyPlotPath(subregion, pathway, 'decay_time')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={physiologyPlotPath(subregion, pathway, 'transmission_failures')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={physiologyPlotPath(subregion, pathway, 'coefficient_variation')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={physiologyPlotPath(subregion, pathway, 'failures_vs_amplitudes')} />
            </div>
            <div className="col-xs-6 col-sm-3 mt-2">
              <Plot url={physiologyPlotPath(subregion, pathway, 'CV_vs_amplitudes')} />
            </div>
          </div>
        </Collapsible>

        <Collapsible className="mt-3" title="Synaptomes">
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
        </Collapsible>

        <Collapsible className="mt-3" title={`Synaptome ${pathway}`}>
          <Synaptome
            className="mt-3"
            type="pathway"
            region={subregion}
            pathway={pathway}
          />
        </Collapsible>

        <Collapsible className="mt-3" color="red" title="Simulations">
          <div className="row">
            <div className="col-xs-4">
              Definition : explain that these are in silico experiments. Explanation of this exact simulation.
            </div>
            <div className="col-xs-4">
              <ImageViewer border src="https://bbp.epfl.ch/nmc-portal/assets/documents/10184/1204661/11_maya_christmasTree.jpg" />
            </div>
            <div className="col-xs-4">
              <h3 className="mt-0">Explore data</h3>
              <ul>
                <li> <Button>Pair Recording App</Button> </li>
                <li> <Button>Visualize with Brayns</Button> </li>
              </ul>
            </div>
          </div>
        </Collapsible>
      </DataContainer>
    )}
  </SynapticPathwaysTemplates>
);

export default RecSynPathwaysView;
