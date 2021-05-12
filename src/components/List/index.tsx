import React, { useState, useEffect } from 'react';

import { Color } from '../../types';


const classPrefixList = 'list__';
const classPrefixListElement = 'list-element__';

type ListProps = {
  title?: string;
  list: string[];
  value?: string;
  onSelect?: (s: string) => void;
  color?: Color;
  block?: boolean;
};


const List: React.FC<ListProps> = ({
  title,
  list,
  value,
  onSelect = () => { },
  color,
  block = false,
}) => {
  const id = title ? title.replace(/\s/g, '') : 'no_title';

  return (
    <div
      className={`${classPrefixList}basis ${color} ${block ? 'block' : ''}`}
      role="radiogroup"
      aria-labelledby={`${classPrefixList}${id}`}
    >
      {title && <p>{title} ({list.length})</p>}
      <div className="elements">
        {list.map(element => {
          const selected = value === element
          return <div
            role="radio"
            key={element}
            aria-checked={selected}
            tabIndex={0}
            className={`${classPrefixListElement}basis ${selected ? 'selected' : ''}`}
            onClick={() => onSelect(element)}
          >
            {element}
          </div>
        })}
      </div>
    </div>
  );
};

export default List;
