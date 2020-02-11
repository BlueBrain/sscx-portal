import React from 'react';

import './style.less';
import { Palette } from '../../types';

const classPrefixPills = 'pills__';
const classPrefixPill = 'pill__';

type PillsProps = {
  title?: string;
  list: string[];
  defaultValue: string;
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
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      className={`${classPrefixPill}basis ${
        selected ? `${classPrefixPill}selected` : ''
      }`}
      onClick={() => onSelect && onSelect(element)}
      style={{
        backgroundColor: selected && color,
        border: selected && color && `2px solid ${color}`,
        color: selected && color && 'white',
      }}
    >
      {element}
    </div>
  );
};

const Pills: React.FC<PillsProps> = ({
  title,
  list,
  defaultValue,
  onSelect,
  color,
}) => {
  const [activePill, setActivePill] = React.useState<string>(defaultValue);

  const handleSelectedPill = element => {
    setActivePill(element);
    onSelect && onSelect(element);
  };

  const id = title ? title.replace(/\s/g, '') : 'no_title';

  return (
    <div className={`${classPrefixPills}basis`}>
      {title && <p id={`${classPrefixPill}${id}`}>{title}</p>}
      <div
        className="elements"
        role="radiogroup"
        aria-labelledby={`${classPrefixPill}${id}`}
      >
        {list.map(el => (
          <Pill
            key={`${el}`}
            element={el}
            selected={activePill === el}
            onSelect={handleSelectedPill}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default Pills;
