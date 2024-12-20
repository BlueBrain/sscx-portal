import React from 'react';

import LayerAnatomyTemplate from '../../templates/LayerAnatomy';
import { color, sectionTitle } from './config';
import { expDataLayerAnatomyDataPath } from '../../queries/http';
import Collapsible from '../../components/Collapsible';
import DataContainer from '../../components/DataContainer';
import LayerThickness from '../../components/LayerThickness';
import NeuralDensity from '../../components/NeuralDensity';
import LayerAnatomySummary from '../../components/LayerAnatomySummary';
import HttpData from '@/components/HttpData';

const LayerAnatomyView = () => (
  <LayerAnatomyTemplate
    color={color}
    sectionTitle={sectionTitle}
  >
    {(layer) => (
      <DataContainer
        visible={!!layer}
        navItems={[
          { id: 'layerSection', label: 'Layer' },
          { id: 'summarySection', label: 'Summary' },
        ]}
      >
        <HttpData path={expDataLayerAnatomyDataPath()}>
          {data => (
            <>{data && (
              <>
                <Collapsible id="layerSection" title={`Layer ${layer}`}>
                  <div>
                    <h3>Layer thickness for S1</h3>
                    <p>
                      Data are provided in the form of raw microscopy images of NeuN
                      (neuron-specific nuclear protein) stained coronal slices with annotations of individual layer extents,
                      and spreadsheets summarizing measurements of layer thicknesses.
                    </p>
                  </div>

                  <LayerThickness layer={layer} data={data} />

                  <div>
                    <h3>Neuronal density</h3>
                    <p>Data are given as raw microscopy images of NeuN stained slices with annotations of
                      individual layer extents, and spreadsheets summarizing measurements of neuron counts
                      across different layers.
                    </p>
                  </div>

                  <NeuralDensity layer={layer} data={data} />
                </Collapsible>

                <Collapsible id="summarySection" title="Summary" className="mt-4">
                  <LayerAnatomySummary data={data} highlightLayer={layer} />
                </Collapsible>
              </>
            )}</>
          )}
        </HttpData>
      </DataContainer>
    )}
  </LayerAnatomyTemplate>
);

export default LayerAnatomyView;
