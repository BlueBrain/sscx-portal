import React, { useEffect } from 'react';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';

import { Table } from 'antd';
import { Layer } from '../../types';
import { entryToArray, useExpMorphologyColumns } from './expMorphologyTableUtils';

import styles from './styles.module.scss';
import { expDataAgentsPath } from '@/queries/http';


type ExpMorphologyTableProps = {
  layer: Layer;
  mtype: string;
  morphologies: Record<string, any>[];
  currentMorphology?: string;
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

const ExpMorphologyTable: React.FC<ExpMorphologyTableProps> = ({
  layer,
  mtype,
  currentMorphology,
  morphologies = []
}) => {
  const agentIds = morphologies.reduce((ids: string[], morphology) => {
    const currIds = entryToArray(morphology.contribution)
      .filter(contribution => !get(contribution, 'hadRole.label')?.match(/transformation/i))
      .map(contribution => contribution.agent?.['@id'])
      .filter(Boolean);

    return Array.from(new Set([...ids, ...currIds]));
  }, []);


  const { setAgentMap, columns } = useExpMorphologyColumns(layer, mtype, currentMorphology);

  useEffect(() => {
    if (!agentIds.length) return;

    fetch(expDataAgentsPath())
      .then(res => res.json())
      .then(allAgentResources => allAgentResources.filter(agentResource => agentIds.includes(agentResource['@id'])))
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
    <div
      id="expMorphologyTable"
      className="layer-anatomy-summary__basis mt-2"
    >
      <Table
        className="responsiveTable"
        columns={columns}
        dataSource={morphologies}
        size="small"
        rowKey={(morphology: any) => morphology.name}
        rowClassName={morphology => morphology.name === currentMorphology ? styles.highlightedRowBg : undefined}
      />
    </div>
  );
};


export default ExpMorphologyTable;
