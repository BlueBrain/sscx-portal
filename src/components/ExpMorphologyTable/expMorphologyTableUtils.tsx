import React, { useState } from 'react';
import queryString from 'querystring';
import { DownloadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { ColumnsType } from 'antd/lib/table';
import { expMorphologyImgPath, expMorphologyImgThumbnailPath } from '../../queries/http';
import ImageViewer from '../ImageViewer';
import NexusFileDownloadButton from '../NexusFileDownloadButton';

import styles from './styles.module.scss';
import { sscx } from '../../config';

const getMorphologyDistribution = (morphologyResource: any) => (
  morphologyResource.distribution.find((d: any) => d.name.match(/\.asc$/i))
);

export function entryToArray(entry) {
  if (Array.isArray(entry)) return entry;
  return [entry];
}

export const useExpMorphologyColumns = (layer, mtype) => {
  const [agentMap, setAgentMap] = useState<Record<string, any>>(null);

  const morphHref = (morphologyName: string) => {
    const query = queryString.stringify({
      layer,
      mtype,
      instance: morphologyName,
    });
    return `/experimental-data/neuron-morphology/?${query}#data`;
  };

  const columns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: function NameLink(value) {
        return <Link href={morphHref(value)}>{value}</Link>;
      },
      ellipsis: true,
    },
    {
      title: 'Preview',
      dataIndex: 'name',
      width: 220,
      render: function Preview(value) {
        return (
          <div className={styles.morphImageContainer}>
            <ImageViewer
              src={expMorphologyImgPath(value)}
              thumbnailSrc={expMorphologyImgThumbnailPath(value)}
              alt={`Morphology ${value} image`}
              loading="lazy"
            />
          </div>
        );
      },
    },
    {
      title: 'M-Type',
      dataIndex: 'annotation',
      align: 'center',
      render: function Link(value) {
        return value.hasBody.label;
      },
      responsive: ['md'],
    },
    {
      title: 'Contribution',
      dataIndex: 'contribution',
      render: function Link(value) {
        return (
          agentMap && entryToArray(value)
            .map(contribution => agentMap[contribution.agent['@id']])
            .sort((a1, a2) => (a1.type > a2.type ? 1 : -1))
            .map(agent => <span key={agent.label}>{agent.label} <br /></span>)
        );
      },
      responsive: ['md'],
    },
    {
      title: 'Download',
      dataIndex: 'name',
      width: 100,
      align: 'center',
      render: function Link(_value, record) {
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
        );
      },
      responsive: ['md'],
    },
  ];

  return ({
    columns,
    setAgentMap,
  });
};

