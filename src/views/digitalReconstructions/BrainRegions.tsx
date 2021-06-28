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
import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';

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
      <DataContainer visible={!!subregion}>
        <Collapsible title={`${subregion} (Sub-region) Factsheet`}>
          <HttpData path={subregionCircuitFactsheetPath(subregion)}>
            {data => (
              <>
                {data && <Factsheet id="subregionCircuitFactsheet" facts={data[0].values} />}
              </>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible title="S1 (Region) Factsheet" className="mt-4">
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

        <Collapsible color="red" title="Simulations" className="mt-4">
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
  </BrainRegionTemplate>
);

export default BrainRegionsView;

