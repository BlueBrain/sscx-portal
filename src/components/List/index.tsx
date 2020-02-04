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
  palette: Palette;
};

type ListElementProps = {
  element: string;
  selected: boolean;
  onSelect?: (string) => void;
  palette: Palette;
};

const ListElement: React.FC<ListElementProps> = ({ element, selected, onSelect, palette }) => {
  return <div className={`${classPrefixListElement}${palette} ${selected ? `${classPrefixListElement}${palette}-selected` : ''}`}
              onClick={() => onSelect(element)}>
    {element}
  </div>;
};

const List: React.FC<ListProps> = ({ title, list, selected, onSelect, palette }) => {
  return <div className={`${classPrefixList}basis`}>
    {title && <p>{title}</p>}
    <div className='elements'>
      {list.map(el => <ListElement element={el}
                                   selected={selected === el}
                                   onSelect={onSelect}
                                   palette={palette}/>)}
    </div>
  </div>;
};

export default List;
