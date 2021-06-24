import React, { useState, useEffect } from 'react';
import { keyBy } from 'lodash';
import { useNexusContext } from '@bbp/react-nexus';
import { DownloadOutlined } from '@ant-design/icons';

import { sscx } from '../../config';
import { expMorphologyImgPath, expMorphologyImgThumbnailPath } from '../../queries/http';
import ImageViewer from '../ImageViewer';
import NexusFileDownloadButton from '../NexusFileDownloadButton';

import styles from './styles.module.scss'


type ExpMorphologyTableProps = {
  morphologies: Record<string, any>[];
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

const getMorphologyDistribution = (morphologyResource: any) => {
  return morphologyResource.distribution.find((d: any) => d.name.match(/\.asc$/i));
};

const ExpMorphologyTable: React.FC<ExpMorphologyTableProps> = ({ morphologies = [] }) => {
  const nexus = useNexusContext();

  const agentIds = morphologies.reduce((ids: string[], morphology) => {
    const currIds = entryToArray(morphology.contribution)
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
  }, [morphologies]);

  return (
    <div id="expMorphologyTable" className="layer-anatomy-summary__basis mt-2">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>M-Type</th>
            <th>Contribution</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {morphologies.map(morph => (
            <tr key={morph.name}>
              <td className="text-capitalize">{morph.name}</td>
              <td style={{ textAlign: 'center'}}>
                <div className={styles.morphImageContainer}>
                  <ImageViewer
                    src={expMorphologyImgPath(morph.name)}
                    thumbnailSrc={expMorphologyImgThumbnailPath(morph.name)}
                    alt={`Morphology ${morph.name} image`}
                    loading="lazy"
                  />
                </div>
              </td>
              <td>{morph.annotation.hasBody.label}</td>
              <td>
                {agentMap && entryToArray(morph.contribution)
                  .map(contribution => agentMap[contribution.agent['@id']])
                  .sort((a1, a2) => a1.type > a2.type ? 1 : -1)
                  .map(agent => <span key={agent.label}>{agent.label} <br/></span>)
                }
              </td>
              <td className="text-center">
                <NexusFileDownloadButton
                  className={styles.downloadBtn}
                  filename={getMorphologyDistribution(morph).name}
                  url={getMorphologyDistribution(morph).contentUrl}
                  org={sscx.org}
                  project={sscx.project}
                  animate={false}
                >
                  <DownloadOutlined />
                </NexusFileDownloadButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ExpMorphologyTable;
