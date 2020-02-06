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
  color?: string;
};

type PillProps = {
  element: string;
  selected: boolean;
  onSelect?: (string) => void;
  color?: string;
};

const Pill: React.FC<PillProps> = ({ element, selected, onSelect, color }) => {
  return (
    <div
      className={`${classPrefixPill}basis ${
        selected ? `${classPrefixPill}selected` : ''
      }`}
      onClick={() => onSelect(element)}
      style={{ backgroundColor: selected && color, border: selected && color && `2px solid ${color}`, color: selected && color && 'white' }}
    >
      {element}
    </div>
  );
};

const Pills: React.FC<PillsProps> = ({ title, list, selected, onSelect, color }) => {
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
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default Pills;
