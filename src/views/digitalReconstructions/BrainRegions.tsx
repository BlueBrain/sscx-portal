import React from 'react';
import { Table } from 'antd';

import BrainRegionTemplate from '../../templates/BrainRegions';
import DataContainer from '../../components/DataContainer';
import HttpDownloadButton from '../../components/HttpDownloadButton';
import Factsheet from '../../components/Factsheet';
import HttpData from '../../components/HttpData';
import { color, sectionTitle } from './config';
import { subregions, subregionTitle } from '../../constants';
import { regionCircuitFactsheetPath, subregionCircuitFactsheetPath } from '../../queries/http';
import Collapsible from '../../components/Collapsible';
import SimulationSection from '../../components/SimulationSection';

const subregionTableDataSource = subregions.map(subregion => ({ abbr: subregion, name: subregionTitle[subregion] }));
const subregionTableColumns = [
  { title: 'Abbreviation', dataIndex: 'abbr', key: 'abbr' },
  { title: 'Full name', dataIndex: 'name', key: 'name' },
];

function getSubregionDescription(subregion: string, data): string {
  const neurons = data.find(d => d.name === 'No. of neurons')?.value || '';
  const extrSynapses = data.find(d => d.name === 'No. of extrinsic synapses')?.value;
  const intrSynapses = data.find(d => d.name === 'No. of intrinsic synapses')?.value;
  const synapses = (extrSynapses && extrSynapses) ? extrSynapses + intrSynapses : '';
  
  return `The ${subregion} sub-region consists of ${neurons?.toLocaleString()} neurons
    mediated by ${synapses?.toLocaleString()} synapses.`;
}

const BrainRegionsView = () => (
  <BrainRegionTemplate
    color={color}
    sectionTitle={sectionTitle}
  >
    {(subregion) => (
      <DataContainer
        visible={!!subregion}
        navItems={[
          { id: 'subregionSection', label: 'Subregion' },
          { id: 'regionSection', label: 'Region' },
          { id: 'simulationSection', label: 'Simulations' },
        ]}
      >
        <Collapsible
          id="subregionSection"
          title={`${subregion} (Sub-region) Factsheet`}
        >
          <HttpData path={subregionCircuitFactsheetPath(subregion)}>
            {data => (
              <>
                <p>{getSubregionDescription(subregion, data[0].values)}</p>
                <Factsheet id="subregionCircuitFactsheet" facts={data[0].values} />
                <div className="text-right mt-2">
                  <HttpDownloadButton
                    href={subregionCircuitFactsheetPath(subregion)}
                    download={`subregion-circuit-factsheet-${subregion}.json`}
                  >
                    factsheet
                  </HttpDownloadButton>
                </div>
              </>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible
          id="regionSection"
          className="mt-4"
          title="S1 (Region) Factsheet"
        >
          <p>The S1 consists of eight sub-regions:</p>

          <Table
            className="mb-4"
            dataSource={subregionTableDataSource}
            columns={subregionTableColumns}
            pagination={false}
            size="small"
            tableLayout="fixed"
            bordered
          />

          <HttpData path={regionCircuitFactsheetPath()}>
            {data => (
              <>
                <h3>Factsheet</h3>
                <Factsheet
                  id="regionCircuitFactsheet"
                  className="mt-2"
                  facts={data[0].values}
                />
                <div className="text-right mt-2">
                  <HttpDownloadButton
                    href={regionCircuitFactsheetPath()}
                    download={`region-circuit-factsheet.json`}
                  >
                    factsheet
                  </HttpDownloadButton>
                </div>
              </>
            )}
          </HttpData>
        </Collapsible>

        <SimulationSection />
      </DataContainer>
    )}
  </BrainRegionTemplate>
);

export default BrainRegionsView;

