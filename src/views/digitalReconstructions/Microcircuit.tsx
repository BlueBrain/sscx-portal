import React from 'react';

import MicrocircuitsTemplates from '../../templates/Microcircuit';
import { color, sectionTitle } from './config';
import { layerFactsheetPath, subregionMicrocircuitFactsheetPath } from '../../queries/http';
import Collapsible from '../../components/Collapsible';
import HttpData from '../../components/HttpData';
import DataContainer from '../../components/DataContainer';
import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';
import Factsheet from '../../components/Factsheet';


const RecMicrocircuitView = () => (
  <MicrocircuitsTemplates
    color={color}
    sectionTitle={sectionTitle}
  >
    {(subregion, layerNums) => (
      <DataContainer
        visible={!!layerNums.length}
        navItems={[
          { id: 'layerSection', label: 'Layer' },
          { id: 'microcircuitSection', label: 'Microcircuit' },
          { id: 'simulationSection', label: 'Simulations' },
        ]}
      >
        <Collapsible
          id="layerSection"
          title={`Layer ${layerNums.join('/')} of ${subregion} Microcircuit`}
        >
          {layerNums.map(layerNum => (
            <div key={layerNum}>
              <HttpData path={layerFactsheetPath(subregion, layerNum)}>
                {data => (
                  <>
                    <h3 className="mb-2">L{layerNum} Anatomy</h3>
                    {data && <Factsheet id="layerAnatomyFactsheet" facts={data[0].values} />}
                    <h3 className="mt-3 mb-2">L{layerNum} Physiology</h3>
                    {data && <Factsheet id="layerPhysiologyFactsheet" className="mb-3" facts={data[1].values} />}
                  </>
                )}
              </HttpData>
            </div>
          ))}
        </Collapsible>

        <Collapsible
          id="microcircuitSection"
          className="mt-4"
          title={`${subregion} Microcircuit Factsheet`}
        >
          <HttpData path={subregionMicrocircuitFactsheetPath(subregion)}>
            {data => (
              <>
                {data && <Factsheet id="subregionMicrocircuitFactsheet" facts={data[0].values}/>}
              </>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible
          id="simulationSection"
          className="mt-4"
          color="red"
          title="Simulations"
        >
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
      </DataContainer>
    )}
  </MicrocircuitsTemplates>
);

export default RecMicrocircuitView;
