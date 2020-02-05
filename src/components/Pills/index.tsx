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
  palette: Palette;
};

type PillProps = {
  element: string;
  selected: boolean;
  onSelect?: (string) => void;
  palette: Palette;
};

const Pill: React.FC<PillProps> = ({ element, selected, onSelect, palette }) => {
  return <div className={`${classPrefixPill}${palette} ${selected ? `${classPrefixPill}${palette}-selected` : ''}`}
              onClick={() => onSelect(element)}>
    {element}
  </div>;
};

const Pills: React.FC<PillsProps> = ({ title, list, selected, onSelect, palette }) => {
  return <div className={`${classPrefixPills}basis`}>
    {title && <p>{title}</p>}
    <div className='elements'>
      {list.map((el, i) => <Pill key={i}
                                 element={el}
                                 selected={selected === el}
                                 onSelect={onSelect}
                                 palette={palette}/>)}
    </div>
  </div>;
};

export default Pills;
