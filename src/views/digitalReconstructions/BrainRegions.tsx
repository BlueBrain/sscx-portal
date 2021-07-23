import React from 'react';
import { Table } from 'antd';

import BrainRegionTemplate from '../../templates/BrainRegions';
import DataContainer from '../../components/DataContainer';
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
                {data && <Factsheet id="subregionCircuitFactsheet" facts={data[0].values} />}
              </>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible
          id="regionSection"
          title="S1 (Region) Factsheet"
          className="mt-4"
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
                {data && (
                  <>
                    <h3>Factsheet</h3>
                    <Factsheet
                      id="regionCircuitFactsheet"
                      className="mt-2"
                      facts={data[0].values}
                    />
                  </>
                )}
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

