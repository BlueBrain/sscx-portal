import React, { useState, useEffect } from 'react';
import { useNexusContext } from '@bbp/react-nexus';

import { sscx } from '../../config';


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

type MetadataProps = {
  nexusDocument: Record<string, any>;
};

const Metadata: React.FC<MetadataProps> = ({ nexusDocument }) => {
  const nexus = useNexusContext();

  const [agents, setAgents] = useState<Record<string, any>[]>(null);

  const agentIds = entryToArray(nexusDocument.contribution)
    .map(contribution => contribution.agent?.['@id'])
    .filter(Boolean);

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
      .then(agents => setAgents(agents));
  }, [nexusDocument]);

  const contributionStr = agents
    ? agents.map(agent => agent.label).join(', ')
    : '...';

  return (
    <>
      <h3>Contribution</h3>
      <p id={agents ? 'metadata' : undefined}>
        {contributionStr}
      </p>
    </>
  );

};


export default Metadata;
