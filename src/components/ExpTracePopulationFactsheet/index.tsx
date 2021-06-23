import React from 'react';
import { Table, Collapse } from 'antd';

import NumberFormat from '../NumberFormat';
import styles from './index.module.scss';


const { Panel } = Collapse;

export type EtypeFactsheetProps = {
  data?: any;
  id?: string;
};

const unitLabelMap = {
  constant: '',
  'mV/nA': 'MΩ',
};

const unitLabel = (unit: string) => unitLabelMap[unit] ?? unit;


const EtypeFactsheet: React.FC<EtypeFactsheetProps> = ({
  data,
  id = '',
}) => {
  const tableData = {};
  const protocols = [];
  Object.entries(data).forEach(([protocol, protocolVal]) => {
    protocols.push(protocol);
    Object.entries(protocolVal).forEach(([measurement, measurementVal]) => {
      measurementVal.sort((f1, f2) => (f1.feature > f2.feature) ? 1 : -1).forEach(feature => {
        if (!tableData[protocol]) {
          tableData[protocol] = [];
        }

        tableData[protocol].push({
          key: feature.feature,
          protocol,
          measurement,
          n: feature.n,
          feature: feature.feature,
          unit: feature.unit,
          mean: feature.val[0],
          std: feature.val[1],
        })
      });
    });
  });

  protocols.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const tableColumns = [
    {
      title: 'Feature',
      dataIndex: 'feature',
      render: feature => feature.replace(/\_/g, ' '),
    },
    {
      title: 'Mean ± Std',
      key: 'value',
      render: (row) => (
        <span>
          <NumberFormat value={row.mean} /> ± <NumberFormat value={row.std} /> {unitLabel(row.unit)} &nbsp; (n={row.n})
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Collapse
        className="mb-3"
        bordered={false}
        defaultActiveKey={protocols[0]}
      >
        {protocols.map(protocol => (
          <Panel key={protocol} header={<strong>{protocol}</strong>}>
            <Table
              dataSource={tableData[protocol]}
              columns={tableColumns}
              pagination={false}
              size="small"
              tableLayout="fixed"
              bordered
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};


export default EtypeFactsheet;
