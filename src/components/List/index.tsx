import React from 'react';

import './style.less';
import { Palette } from '../../types';

const classPrefixList = 'list__';
const classPrefixListElement = 'list-element__';

type ListProps = {
  title?: string;
  list: string[];
  selected: string;
  onSelect?: (string) => void;
  color?: string;
};

type ListElementProps = {
  element: string;
  selected: boolean;
  onSelect?: (string) => void;
  color?: string;
};

const ListElement: React.FC<ListElementProps> = ({
  element,
  selected,
  onSelect,
  color
}) => {
  return (
    <div
      className={`${classPrefixListElement}basis ${
        selected ? 'selected' : ''}`}
      onClick={() => onSelect(element)}
      style={{ backgroundColor: selected && color }}
    >
      {element}
    </div>
  );
};

const List: React.FC<ListProps> = ({
  title,
  list,
  selected,
  onSelect,
  color
}) => {
  return (
    <div className={`${classPrefixList}basis`}>
      {title && <p>{title}</p>}
      <div className="elements">
        {list.map((el, i) => (
          <ListElement
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

export default List;
