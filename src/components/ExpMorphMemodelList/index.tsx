import React, { ReactNode } from 'react';
import Link from 'next/link';
import qs from 'querystring';
import { Table } from 'antd';
import ResponsiveTable from '../ResponsiveTable';


type ExpMorphMemodelListProps = {
  memodels: ExpMorphMemodel[];
  className?: string;
  id?: string;
}

type ExpMorphMemodel = {
  region: string;
  mtype: string;
  etype: string;
  memodel_name: ReactNode;
}

const hrefBase = '/digital-reconstructions/neurons';

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
    dataIndex: 'region' as keyof ExpMorphMemodel,
    key: 'region',
  },
  {
    title: 'M-type',
    dataIndex: 'mtype' as keyof ExpMorphMemodel,
    key: 'mtype',
  },
  {
    title: 'E-type',
    dataIndex: 'etype' as keyof ExpMorphMemodel,
    key: 'etype',
  },
  {
    title: 'ME-model',
    dataIndex: 'memodel_name' as keyof ExpMorphMemodel,
    key: 'memodel_name'
  },
];

const mtypeLayer = (mtype: string) => {
  const rawLayer = mtype.match(/(L\d+)\_.*/)[1];
  return ['L23', 'L2', 'L3'].includes(rawLayer)
    ? 'L23'
    : rawLayer;
}

const ExpMorphMemodelList: React.FC<ExpMorphMemodelListProps> = ({ memodels, className = '', id = '' }) => {
  const memodelsDataSource: ExpMorphMemodel[] = memodels
    .map(memodel => ({ ...memodel, memodel_name: <Link href={linkHref(memodel)}>{memodel.memodel_name}</Link>, key: `${memodel.region}-${memodel.memodel_name}` }));

  return (
    <div id={id} className={className}>
      <ResponsiveTable<ExpMorphMemodel>
        data={memodelsDataSource}
        columns={tableColumns}
        pagination={memodelsDataSource.length > 10 ? { position: ['bottomRight'] } : false}
        size="small"
        tableLayout="fixed"
        bordered
      />
    </div>
  );
};


export default ExpMorphMemodelList;
