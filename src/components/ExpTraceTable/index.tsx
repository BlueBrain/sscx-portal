import React, { useEffect } from 'react';
import keyBy from 'lodash/keyBy';
import { useNexusContext } from '@bbp/react-nexus';

import { Table } from 'antd';
import { nexus as nexusConfig } from '../../config';
import { entryToArray, useExperimentalTraceTable } from './expTraceTableUtils';

import styles from './styles.module.scss';
import { expDataAgentsPath } from '@/queries/http';


type ExpTraceTableProps = {
  etype: string;
  traces: Record<string, any>[];
  currentTrace?: string;
};

function getAgentLabel(agent) {
  return agent.name
    ? agent.name
    : `${agent.givenName} ${agent.familyName}`;
}

function getAgentType(agent) {
  return agent.name
    ? 'institution'
    : 'person';
}

const ExpTraceTable: React.FC<ExpTraceTableProps> = ({ etype, currentTrace, traces = [] }) => {
  const nexus = useNexusContext();

  const agentIds = traces.reduce((ids: string[], trace) => {
    const currIds = entryToArray(trace.contribution)
      .map(contribution => contribution.agent?.['@id'])
      .filter(Boolean);

    return Array.from(new Set([...ids, ...currIds]));
  }, []);

  const { agentMap, setAgentMap, columns } = useExperimentalTraceTable(etype, currentTrace);


  useEffect(() => {
    if (!agentIds.length) return;

    fetch(expDataAgentsPath())
      .then(res => res.json())
      .then(allAgentResources => allAgentResources.filter(agentResource => agentIds.includes(agentResource['@id'])))
      // pick only agent ids and labels
      .then(agents => agents.map(agent => ({
        id: agent['@id'],
        label: getAgentLabel(agent),
        type: getAgentType(agent),
      })))
      // create a map of agents of type Record<id, label>
      .then(agents => keyBy(agents, 'id'))
      .then(agentMap => setAgentMap(agentMap));
  }, [traces]);

  return (
    <div
      id={traces.length && agentMap ? 'expTraceTable' : null}
      className="layer-anatomy-summary__basis mt-2"
    >
      <Table
        columns={columns}
        dataSource={traces}
        rowKey={(trace: any) => trace.name}
        rowClassName={trace => trace.name === currentTrace ? styles.highlightedRowBg : undefined}
      />
    </div>
  );
};


export default ExpTraceTable;
