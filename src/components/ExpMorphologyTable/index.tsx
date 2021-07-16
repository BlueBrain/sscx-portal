import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { keyBy } from 'lodash';
import { useNexusContext } from '@bbp/react-nexus';
import { DownloadOutlined } from '@ant-design/icons';
import qs from 'querystring';

import { sscx } from '../../config';
import { Layer } from '../../types';
import { expMorphologyImgPath, expMorphologyImgThumbnailPath } from '../../queries/http';
import ImageViewer from '../ImageViewer';
import NexusFileDownloadButton from '../NexusFileDownloadButton';

import styles from './styles.module.scss'
import { Table } from 'antd';


type ExpMorphologyTableProps = {
  layer: Layer;
  mtype: string;
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

const ExpMorphologyTable: React.FC<ExpMorphologyTableProps> = ({ layer, mtype, morphologies = [] }) => {
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

  const morphHref = (morphologyName: string) => {
    const query = qs.stringify({
      layer,
      mtype,
      instance: morphologyName,
    });
    return `/experimental-data/neuron-morphology/?${query}#data`
  };

  const columns = [
    { title: 'Name', dataIndex: 'name',render: function Link (value) {
      return <Link href={morphHref(value)}>{value}</Link>
    } },
    { title: 'Preview', dataIndex: 'name',render: function Preview (value) {
      return (
      <div className={styles.morphImageContainer}>
      <ImageViewer
        src={expMorphologyImgPath(value)}
        thumbnailSrc={expMorphologyImgThumbnailPath(value)}
        alt={`Morphology ${value} image`}
        loading="lazy"
      />
    </div>)}
     },
     { title: 'M-Type', dataIndex: 'annotation',render: function Link (value) {
      return value.hasBody.label
    } },
    { title: 'Contribution', dataIndex: 'contribution',render: function Link (value) {
      return (
        agentMap && entryToArray(value)
          .map(contribution => agentMap[contribution.agent['@id']])
          .sort((a1, a2) => a1.type > a2.type ? 1 : -1)
          .map(agent => <span key={agent.label}>{agent.label} <br/></span>)
        
      )
    } },
    { title: 'Download', dataIndex: 'name',render: function Link (_value, record) {
      return (
        <NexusFileDownloadButton
        className={styles.downloadBtn}
        filename={getMorphologyDistribution(record).name}
        url={getMorphologyDistribution(record).contentUrl}
        org={sscx.org}
        project={sscx.project}
        animate={false}
      >
        <DownloadOutlined />
      </NexusFileDownloadButton>
      )
    } },
  ]

  return (
    <div id="expMorphologyTable" className="layer-anatomy-summary__basis mt-2">
      <Table columns={columns}/>
      <table>
        <thead>
          <tr>
            <th>Contribution</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {morphologies.map(morph => (
            <tr key={morph.name}>
              <td></td>
              <td style={{ textAlign: 'center'}}>

              </td>
              <td></td>
              <td>

              </td>
              <td className="text-center">

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ExpMorphologyTable;
