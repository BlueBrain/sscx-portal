import React from 'react';
import Link from 'next/link';
import qs from 'querystring';
import { Table } from 'antd';


type ExpMorphMemodelListProps = {
  memodels: Record<string, string>[];
  className?: string;
}

const hrefBase = '/digital-reconstructions/neurons';

const neuriteTypeLabel = {
  axon: 'axon',
  dendrite: 'dendrite',
  'axon+dendrite': 'axon and dendrite',
}

const linkHref = (memodel) => {
  const query = qs.stringify({
    brain_region: memodel.region,
    layer: mtypeLayer(memodel.mtype),
    mtype: memodel.mtype,
    etype: memodel.etype,
    memodel: memodel.memodel_name,
  });
  return `${hrefBase}?${query}`;
};

const tableColumns = [
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'M-type',
    dataIndex: 'mtype',
    key: 'mtype',
  },
  {
    title: 'E-type',
    dataIndex: 'etype',
    key: 'etype',
  },
  {
    title: 'ME-model',
    dataIndex: 'memodel_name',
    render: (memodel_name, memodel) => <Link href={linkHref(memodel)}>{memodel_name}</Link>
  },
];

const mtypeLayer = (mtype: string) => {
  const rawLayer = mtype.match(/(L\d+)\_.*/)[1];
  return ['L23', 'L2', 'L3'].includes(rawLayer)
    ? 'L23'
    : rawLayer;
}

const ExpMorphMemodelList: React.FC<ExpMorphMemodelListProps> = ({ memodels, className = '' }) => {
  return (
    <div className={className}>
      <Table
        dataSource={memodels}
        columns={tableColumns}
        pagination={memodels.length > 10 ? { position: ['bottomRight'] } : false}
        size="small"
        tableLayout="fixed"
        bordered
      />
    </div>
  );
};


export default ExpMorphMemodelList;
