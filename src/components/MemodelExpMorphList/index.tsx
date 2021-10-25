import React from 'react';
import Link from 'next/link';
import { Table } from 'antd';


type MemodelExpMorphListProps = {
  morphologies: Record<string, string>[];
  className?: string;
}

const hrefBase = '/experimental-data/neuron-morphology';

const neuriteTypeLabel = {
  axon: 'axon',
  dendrite: 'dendrite',
  'axon+dendrite': 'axon and dendrite',
}

const tableColumns = [
  {
    title: 'Layer',
    dataIndex: 'layer',
    key: 'layer',
  },
  {
    title: 'M-type',
    dataIndex: 'mtype',
    key: 'mtype',
  },
  {
    title: 'Source neurite type',
    dataIndex: 'source_neurite_type',
    key: 'neuriteType',
  },
  {
    title: 'Morphology',
    dataIndex: 'morphology',
    key: 'morphology',
    render: (morphologyName, morphology) => (
      <Link
        href={linkHref(morphology)}
        prefetch={false}
      >
        {morphologyName}
      </Link>
    ),
  },
];

const linkHref = (morphology) => {
  const searchParams = new URLSearchParams({
    layer: morphology.layer,
    mtype: morphology.mtype,
    instance: morphology.morphology,
  });
  return `${hrefBase}?${searchParams.toString()}`;
};

const rowKey = morphology => `${morphology.morphology}_${morphology.source_neurite_type}`;

const MemodelExpMorphList: React.FC<MemodelExpMorphListProps> = ({ morphologies, className = '' }) => {
  const allMorphologies = morphologies.length === 1 && morphologies[0].source_neurite_type === 'axon+dendrite'
    ? [
      { ...morphologies[0], source_neurite_type: 'axon' },
      { ...morphologies[0], source_neurite_type: 'dendrite' },
    ]
    : morphologies;

  return (
    <div id="memodelExpMorphList" className={className}>
      <Table
        dataSource={allMorphologies}
        columns={tableColumns}
        pagination={false}
        size="small"
        rowKey={rowKey}
        tableLayout="fixed"
        bordered
      />
    </div>
  );
};


export default MemodelExpMorphList;
