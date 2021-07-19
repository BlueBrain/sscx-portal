import React, { useState, useEffect } from 'react';
import { keyBy } from 'lodash';
import { useNexusContext } from '@bbp/react-nexus';

import { Table } from 'antd';
import { sscx } from '../../config';
import { entryToArray, useExperimentalTraceTable } from './expTraceTableUtils';


type ExpTraceTableProps = {
  etype: string;
  traces: Record<string, any>[];
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

const ExpTraceTable: React.FC<ExpTraceTableProps> = ({ etype, traces = [] }) => {
  const nexus = useNexusContext();

  const agentIds = traces.reduce((ids: string[], trace) => {
    const currIds = entryToArray(trace.contribution)
      .map(contribution => contribution.agent?.['@id'])
      .filter(Boolean);

    return Array.from(new Set([...ids, ...currIds]));
  }, []);

  const { agentMap, setAgentMap, columns } = useExperimentalTraceTable(etype);


  useEffect(() => {
    if (!agentIds.length) return;

    const contributionEsQuery = {
      from: 0,
      size: 100,
      query: {
        terms: {
          '_id': agentIds,
        },
      },
    };

    nexus.View
      // query ElesticSearch endpoint to get agents by their ids
      .elasticSearchQuery(sscx.org, sscx.project, sscx.datasetViewId, contributionEsQuery)
      // extract ES documents
      .then(data => data.hits.hits)
      // extract Nexus original documents
      .then(esDocuments => esDocuments.map(esDocument => esDocument._source))
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
    <div id={traces.length && agentMap ? 'expTraceTable' : null} className="layer-anatomy-summary__basis mt-2">
      <Table columns={columns} dataSource={traces} rowKey={({ name }) => name} />
    </div>
  );
};


export default ExpTraceTable;
