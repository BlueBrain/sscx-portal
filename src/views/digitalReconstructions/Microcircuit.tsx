import React from 'react';

import MicrocircuitsTemplates from '../../templates/Microcircuit';
import { colorName, sectionTitle } from './config';
import { layerFactsheetPath } from '../../queries/http';
import Collapsible from '../../components/Collapsible';
import LayerFactsheet from '../../components/LayerFactsheet';
import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';

export default () => (
  <MicrocircuitsTemplates
    color={colorName}
    sectionTitle={sectionTitle}
    factsheetPath={layerFactsheetPath}
  >
    {(subregion, layer, data) => (
      <>
        <Collapsible title={`${subregion} Microcircuit Factsheet`}>
          <LayerFactsheet data={data} />
        </Collapsible>

        <Collapsible title={`Layer ${layer} of ${subregion} Microcircuit Factsheet`}>
          <LayerFactsheet data={data} />
        </Collapsible>

        <div className="mt-2">
          <Collapsible color="red" title="Simulations">
            <div className="row">
              <div className="col-xs-4">
                Definition : explain that these are in silico experiments. Explanation of this exact simulation.
              </div>
              <div className="col-xs-4">
                <ImageViewer border src="https://bbp.epfl.ch/nmc-portal/documents/10184/1204661/11_maya_christmasTree.jpg" />
              </div>
              <div className="col-xs-4">
                <h3 className="mt-0">Explore data</h3>
                <ul>
                  <li><Button>Pair Recording App</Button></li>
                  <li><Button>Visualize with Brayns</Button></li>
                </ul>
              </div>
            </div>
          </Collapsible>
        </div>

      </>
    )}
  </MicrocircuitsTemplates>
);
