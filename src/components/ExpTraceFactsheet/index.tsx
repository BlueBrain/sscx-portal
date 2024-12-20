import React from 'react';
import { Table, Collapse } from 'antd';

import NumberFormat from '../NumberFormat';
import { termFactory } from '../Term';
import { electricalFeatures } from '../../terms';

const Term = termFactory(electricalFeatures);


const { Panel } = Collapse;

export type EtypeFactsheetProps = {
  data?: any;
  id?: string;
  className?: string;
};

const unitLabelMap = {
  constant: '',
  none: '',
  'mV/nA': 'MΩ',
};


const unitLabel = (unit: string) => unitLabelMap[unit] ?? unit;


const ExpTraceFactsheet: React.FC<EtypeFactsheetProps> = ({
  data,
  className = '',
}) => {
  const tableData = {};
  const protocols = [];
  Object.entries(data).forEach(([protocol, protocolVal]) => {
    protocols.push(protocol);
    Object.entries(protocolVal).forEach(([measurement, measurementVal]) => {
      measurementVal.sort((f1, f2) => ((f1.feature > f2.feature) ? 1 : -1)).forEach(feature => {
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
        });
      });
    });
  });

  protocols.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const tableColumns = [
    {
      title: 'Feature',
      dataIndex: 'feature',
      render: feature => <Term term={feature} />,
    },
    {
      title: 'Mean ± Std',
      key: 'value',
      render: (row) => (
        <span>
          <NumberFormat value={row.mean} /> ± <NumberFormat value={row.std} /> {unitLabel(row.unit)}
        </span>
      ),
    },
    {
      title: 'No. of measurements',
      key: 'n',
      className: 'narrowColumn',
      render: row => <NumberFormat value={row.n} />,
    },
  ];

  return (
    <div className={className}>
      <Collapse bordered={false} defaultActiveKey={protocols[0]}>
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


export default ExpTraceFactsheet;
