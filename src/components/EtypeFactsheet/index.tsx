import React from 'react';
import get from 'lodash/get';
import { Table, Collapse, Popover } from 'antd';

import NumberFormat from '../NumberFormat';
import IonChannelPlot, { Equation } from '../IonChannelPlot';
import { termFactory } from '../Term';
import { electricalFeatures } from '../../terms';

import styles from './index.module.scss';


const Term = termFactory(electricalFeatures);

const { Panel } = Collapse;

export type EtypeFactsheetProps = {
  data?: any;
  id?: string;
};

const unitLabelMap = {
  constant: '',
  'mV/nA': 'MΩ',
};

const featureNameMap = {
  bpo_threshold_current: 'threshold_current',
  bpo_holding_current: 'holding_current',
};

const unitLabel = (unit: string) => unitLabelMap[unit] ?? unit;
const featureName = (feature: string) => featureNameMap[feature] ?? feature;

const EtypeFactsheet: React.FC<EtypeFactsheetProps> = ({
  data,
  id = '',
}) => {
  // Experimental features and model fitness table data preparation
  const expFeatures = get(data, '[0].values[0]');

  const tableData = {};
  const protocols = [];
  Object.entries(expFeatures).forEach(([protocol, protocolVal]) => {
    protocols.push(protocol);
    Object.entries(protocolVal).forEach(([measurement, measurementVal]) => {
      measurementVal.features.sort((f1, f2) => ((f1.name > f2.name) ? 1 : -1)).forEach(feature => {
        if (!tableData[protocol]) {
          tableData[protocol] = [];
        }

        tableData[protocol].push({
          key: feature.name,
          protocol,
          measurement,
          feature: feature.name,
          unit: feature.unit,
          mean: feature.values[0].mean,
          std: feature.values[0].std,
          modelFitness: feature['model fitness'],
        });
      });
    });
  });

  protocols.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const tableColumns = [
    {
      title: 'Feature',
      dataIndex: 'feature',
      render: feature => <Term term={featureName(feature)}/>,
    },
    {
      title: 'Mean ± Std',
      key: 'value',
      render: function Mean(row) {
        return (
          <span>
            <NumberFormat value={row.mean} /> ± <NumberFormat value={row.std} /> {unitLabel(row.unit)}
          </span>
        );
      },
    },
    {
      title: 'Model fitness',
      dataIndex: 'modelFitness',
      render: function ModelFitness(modelFitness) {
        return (<NumberFormat value={modelFitness} />);
      },
    },
  ];

  // Channel mechanisms data preparation
  const channelMechanisms = get(data, '[1].values[0].location_map');
  const sections = Object.keys(channelMechanisms);

  const getSortedMechanisms = (section) => {
    const { channels } = channelMechanisms[section];
    // simulates the Object.entries but guaranteeing sorted
    return Object.keys(channels).sort().map((k) => ([k, channels[k]]));
  };

  return (
    <div id="id" className={styles.container}>
      <h3>Electrical features</h3>
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

      <h3>Channel Mechanisms</h3>
      <div className={styles.mechanisms}>
        <div className="row mb-1">
          <div className="col-xs-6 col-md-4"><strong>Sections</strong></div>
          <div className="col-xs-6 col-md-8"><strong>Mechanisms</strong></div>
        </div>
        {sections.map(section => (
          <div className={`row ${styles.mechanismsRow}`} key={section}>
            <div className="col-xs-6 col-md-4">{section}</div>
            <div className="col-xs-6 col-md-8">
              {getSortedMechanisms(section).map(([channelName, channelData]: [string, any]) => (
                <Popover
                  key={channelName}
                  title={channelName}
                  content={(
                    <>
                      {Object.entries(channelData.equations).map(([equationLabel, equation]: [string, Equation]) => (
                        <IonChannelPlot
                          key={equationLabel}
                          name={equationLabel}
                          equation={equation}
                        />
                      ))}
                    </>
                  )}
                >
                  <span
                    className={styles.channelLabel}
                  >
                    {channelName}
                  </span>
                </Popover>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default EtypeFactsheet;
