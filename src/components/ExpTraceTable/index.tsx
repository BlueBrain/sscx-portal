import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import qs from 'querystring';
import { keyBy } from 'lodash';
import { useNexusContext } from '@bbp/react-nexus';

import { sscx } from '../../config';


type ExpTraceTableProps = {
  etype: string;
  traces: Record<string, any>[];
};

function entryToArray(entry) {
  if (Array.isArray(entry)) return entry;

  return [entry];
}

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

  const [agentMap, setAgentMap] = useState<Record<string, any>>(null);

  useEffect(() => {
    if (!agentIds.length) return;

    const contributionEsQuery = {
      from: 0,
      size: 100,
      query: {
        terms: {
          '_id': agentIds,
        }
      }
    }

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

  const instanceHref = (instanceName: string) => {
    const query = qs.stringify({
      etype,
      etype_instance: instanceName,
    });
    return `/experimental-data/neuron-electrophysiology/?${query}#data`;
  };

  return (
    <div id={traces.length && agentMap ? 'expTraceTable' : null} className="layer-anatomy-summary__basis mt-2">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-Type</th>
            <th>Contribution</th>
          </tr>
        </thead>
        <tbody>
          {traces.map(trace => (
            <tr key={trace.name}>
              <td><Link href={instanceHref(trace.name)}>{trace.name}</Link></td>
              <td>{trace.annotation.hasBody.label}</td>
              <td>
                {agentMap && entryToArray(trace.contribution)
                  .map(contribution => agentMap[contribution.agent['@id']])
                  .sort((a1, a2) => a1.type > a2.type ? 1 : -1)
                  .map(agent => <span>{agent.label} <br/></span>)
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ExpTraceTable;
