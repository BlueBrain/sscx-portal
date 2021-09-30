import React, { useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';
import querystring from 'querystring';
import { orderBy } from 'lodash';

import { sscx } from '../../config';
import NexusImage from '../NexusImage';
import NexusFileDownloadButton from '../NexusFileDownloadButton';

import styles from './styles.module.scss';


export function entryToArray(entry) {
  return Array.isArray(entry)
    ? entry
    : [entry];
}

const getIdrestImageNexusUrl = (trace) => {
  const idRestResponseImages = entryToArray(trace.image)
    .filter(image => image.stimulusType['@id'].match(/idrest/i))
    .filter(image => image.about.match(/response/i));

  return orderBy(idRestResponseImages, 'repetition')[0]['@id'];
};

const getTraceDistribution = (trace) => {
  return entryToArray(trace.distribution).find((d: any) => d.name.match(/\.nwb$/i));
};

export const useExperimentalTraceTable = (etype) => {
  const [agentMap, setAgentMap] = useState<Record<string, any>>(null);

  const instanceHref = (instanceName: string) => {
    const query = querystring.stringify({
      etype,
      etype_instance: instanceName,
    });
    return `/experimental-data/neuron-electrophysiology/?${query}#data`;
  };

  const columns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: function NameLink(value) {
        return (
          <Link href={instanceHref(value)}>{value}</Link>
        );
      },
      responsive: ['sm'],
    },
    {
      title: 'Preview',
      dataIndex: 'name',
      width: 220,
      render: function Preview(name, trace, idx) {
        return (
          <div className={styles.traceImageContainer}>
            <NexusImage
              imageUrl={getIdrestImageNexusUrl(trace)}
              org={sscx.org}
              project={sscx.project}
              aspectRatio="4 / 3"
            />
          </div>
        );
      },
      responsive: ['sm'],
    },
    {
      title: 'E-Type',
      dataIndex: 'annotation',
      render: (value) => (value?.hasBody?.label),
      responsive: ['sm'],
    },
    {
      title: 'Contribution',
      dataIndex: 'contribution',
      render: (value) => (
        agentMap && entryToArray(value)
          .map(contribution => agentMap[contribution.agent['@id']])
          .filter(Boolean)
          .sort((a1, a2) => (a1.type > a2.type ? 1 : -1))
          .map(agent => <span key={agent.label}>{agent.label} <br /></span>)
      ),
      responsive: ['md'],
    },
    {
      title: 'Download',
      dataIndex: 'name',
      width: 100,
      align: 'center',
      render: function Link(name, trace) {
        return (
          <NexusFileDownloadButton
            className={styles.downloadBtn}
            filename={getTraceDistribution(trace).name}
            url={getTraceDistribution(trace).contentUrl}
            org={sscx.org}
            project={sscx.project}
            animate={false}
          />
        );
      },
      responsive: ['sm'],
    },
    {
      title: 'Preview',
      dataIndex: 'name',
      render: function Preview(name, trace) {
        return (
          <div className={styles.traceImageContainer}>
            <div className="text-center mb-1">{name}</div>
            <NexusImage
              imageUrl={getIdrestImageNexusUrl(trace)}
              org={sscx.org}
              project={sscx.project}
              aspectRatio="4 / 3"
            />
            <div className={styles.detailsLink}>
              <Link href={instanceHref(name)}>More details</Link>
            </div>
          </div>
        );
      },
      responsive: ['xs'],
    },
  ];

  return ({
    setAgentMap,
    agentMap,
    columns,
  });
};
