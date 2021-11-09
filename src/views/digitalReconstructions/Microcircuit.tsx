import React from 'react';
import { Spin } from 'antd';

import MicrocircuitsTemplates from '../../templates/Microcircuit';
import HttpDownloadButton from '../../components/HttpDownloadButton';
import { color, sectionTitle } from './config';
import { layerFactsheetPath, subregionMicrocircuitFactsheetPath } from '../../queries/http';
import Collapsible from '../../components/Collapsible';
import HttpData from '../../components/HttpData';
import DataContainer from '../../components/DataContainer';
import Factsheet from '../../components/Factsheet';
import SimulationSection from '../../components/SimulationSection';


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
                {(data, loading) => (
                  <Spin spinning={loading}>
                    {data && (
                      <>
                        <h3 className="mb-2">L{layerNum} Anatomy</h3>
                        <Factsheet id="layerAnatomyFactsheet" facts={data[0].values} />

                        <h3 className="mt-3 mb-2">L{layerNum} Physiology</h3>
                        <Factsheet id="layerPhysiologyFactsheet" facts={data[1].values} />

                        <div className="text-right mt-2 mb-3">
                          <HttpDownloadButton
                            href={layerFactsheetPath(subregion, layerNum)}
                            download={`layer-microcircuit-factsheet-${subregion}-L${layerNum}.json`}
                          >
                            factsheet
                          </HttpDownloadButton>
                        </div>
                      </>
                    )}
                  </Spin>
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
            {(data, loading) => (
              <Spin spinning={loading}>
                {data && (
                  <>
                    <Factsheet id="subregionMicrocircuitFactsheet" facts={data[0].values}/>
                    <div className="text-right mt-2">
                      <HttpDownloadButton
                        href={subregionMicrocircuitFactsheetPath(subregion)}
                        download={`microcircuit-factsheet-${subregion}.json`}
                      >
                        factsheet
                      </HttpDownloadButton>
                    </div>
                  </>
                )}
              </Spin>
            )}
          </HttpData>
        </Collapsible>

        <SimulationSection />
      </DataContainer>
    )}
  </MicrocircuitsTemplates>
);

export default RecMicrocircuitView;
