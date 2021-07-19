import React, { useEffect } from 'react';
import { keyBy } from 'lodash';
import { useNexusContext } from '@bbp/react-nexus';

import { Table } from 'antd';
import { sscx } from '../../config';
import { Layer } from '../../types';
import { entryToArray, useExpMorphologyColumns } from './expMorphologyTableUtils';

type ExpMorphologyTableProps = {
  layer: Layer;
  mtype: string;
  morphologies: Record<string, any>[];
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

const ExpMorphologyTable: React.FC<ExpMorphologyTableProps> = ({ layer, mtype, morphologies = [] }) => {
  const nexus = useNexusContext();

  const agentIds = morphologies.reduce((ids: string[], morphology) => {
    const currIds = entryToArray(morphology.contribution)
      .map(contribution => contribution.agent?.['@id'])
      .filter(Boolean);

    return Array.from(new Set([...ids, ...currIds]));
  }, []);


  const { setAgentMap, columns } = useExpMorphologyColumns(layer, mtype);

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
  }, [morphologies]);

  return (
    <div id="expMorphologyTable" className="layer-anatomy-summary__basis mt-2">
      <Table columns={columns} dataSource={morphologies} size="small" rowKey={(record) => record.name} />
    </div>
  );
};


export default ExpMorphologyTable;
