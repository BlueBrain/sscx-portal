import React from 'react';
import { Tooltip } from 'antd';

import style from './styles.module.scss';

type TermDescription = Record<string, string>;

type TermProps = {
  term: string;
};

export const termFactory = (termDescription: TermDescription) => {
  const Term: React.FC<TermProps> = ({ term }) => {
    const description = termDescription[term];
    const termLabel = term.replace(/\_/g, ' ');

    if (!description) {
      return (<span>{termLabel}</span>);
    }

    return (
      <Tooltip title={description} destroyTooltipOnHide={true}>
        <span
          className={`${style.container} ${description ? style.hasDescription : ''}`}
        >
          {termLabel} {!!description && (<sup>?</sup>)}
        </span>
      </Tooltip>
    );
  };

  return Term;
};
