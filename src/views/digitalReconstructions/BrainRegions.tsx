import React from 'react';

import BrainRegionTemplate from '../../templates/BrainRegions';
import BrainSubregionFactsheet from '../../components/BrainSubregionFactsheet';
import { colorName, sectionTitle } from './config';
import { subregionFactsheetPath } from '../../queries/http';
import Collapsible from '../../components/Collapsible';
import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';

export default () => (
  <BrainRegionTemplate
    color={colorName}
    sectionTitle={sectionTitle}
    factsheetPath={subregionFactsheetPath}
  >
    {(subregion, data) => (
      <>
        <Collapsible title="S1 (Region) Factsheet">
          <BrainSubregionFactsheet data={data} />
        </Collapsible>

        <Collapsible title={`${subregion} (Sub-region) Factsheet`}>
          <BrainSubregionFactsheet data={data} />
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
  </BrainRegionTemplate>
);
