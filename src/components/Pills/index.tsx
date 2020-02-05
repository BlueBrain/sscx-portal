import React from 'react';

import './style.less';
import { Palette } from '../../types';

const classPrefixPills = 'pills__';
const classPrefixPill = 'pill__';

type PillsProps = {
  title?: string;
  list: string[];
  selected: string;
  onSelect?: (string) => void;
};

type PillProps = {
  element: string;
  selected: boolean;
  onSelect?: (string) => void;
};

const Pill: React.FC<PillProps> = ({ element, selected, onSelect }) => {
  return (
    <div
      className={`${classPrefixPill}basis ${
        selected ? `${classPrefixPill}selected` : ''
      }`}
      onClick={() => onSelect(element)}
    >
      {element}
    </div>
  );
};

const Pills: React.FC<PillsProps> = ({ title, list, selected, onSelect }) => {
  return (
    <div className={`${classPrefixPills}basis`}>
      {title && <p>{title}</p>}
      <div className="elements">
        {list.map((el, i) => (
          <Pill
            key={i}
            element={el}
            selected={selected === el}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Pills;
