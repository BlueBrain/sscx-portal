import { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';
import React, { useState } from 'react';
import querystring from 'querystring';

export function entryToArray(entry) {
  if (Array.isArray(entry)) return entry;
  return [entry];
}

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
    },
    {
      title: 'E-Type',
      dataIndex: 'annotation',
      render: (value) => (value?.hasBody?.label),
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
      responsive: ['sm'],
    },
  ];

  return ({
    setAgentMap,
    agentMap,
    columns,
  });
};
