import React from 'react';

import './style.less';
import { Color } from '../../types';

const classPrefixList = 'list__';
const classPrefixListElement = 'list-element__';

type ListProps = {
  title?: string;
  list: string[];
  defaultValue?: string;
  onSelect?: (string) => void;
  color?: Color;
};

type ListElementProps = {
  element: string;
  selected?: boolean;
  onSelect?: (string) => void;
};

const ListElement: React.FC<ListElementProps> = ({
  element,
  selected,
  onSelect,
}) => {
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      className={`${classPrefixListElement}basis ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(element)}
    >
      {element}
    </div>
  );
};

const List: React.FC<ListProps> = ({
  title,
  list,
  defaultValue,
  onSelect,
  color,
}) => {
  const [activeElement, setActiveElement] = React.useState<string>(
    defaultValue,
  );

  const handleSelectedElement = (element: string) => {
    setActiveElement(element);
    onSelect && onSelect(element);
  };

  const id = title ? title.replace(/\s/g, '') : 'no_title';

  return (
    <div
      className={`${classPrefixList}basis ${color}`}
      role="radiogroup"
      aria-labelledby={`${classPrefixList}${id}`}
    >
      {title && <p>{title}</p>}
      <div className="elements">
        {list.map(el => (
          <ListElement
            key={`${el}`}
            element={el}
            selected={activeElement === el}
            onSelect={handleSelectedElement}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
