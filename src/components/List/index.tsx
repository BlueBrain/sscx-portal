import React, { useState, useRef, useEffect } from 'react';

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
  disabled?: boolean;
};

const List: React.FC<ListProps> = ({
  title,
  list,
  value,
  onSelect = () => {},
  color,
  block = false,
  disabled = false,
}) => {
  const [skipScrollIntoView, setSkipScrollIntoView] = useState(false);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const id = title ? title.replace(/\s/g, '') : 'no_title';

  const handleSelect = (selectedValue) => {
    if (!disabled) {
      setSkipScrollIntoView(true);
      onSelect(selectedValue);
    }
  };

  useEffect(() => {
    if (!listContainerRef || !listContainerRef.current) return;
    if (!value) return;

    if (skipScrollIntoView) {
      setSkipScrollIntoView(false);
      return;
    }

    const selectedIdx = list.indexOf(value);
    if (selectedIdx === -1) return;

    const selectedEl = listContainerRef.current.children[selectedIdx] as HTMLDivElement;

    selectedEl.parentElement.scrollTop = selectedEl.offsetTop;
    // TODO: Find a clever way to scroll element into the view only when props are changed from the parent component
    // and this change isn't triggered by this component itself, fix issue reported by linter in the line below.
  }, [value, list]);

  return (
    <div
      className={`${classPrefixList}basis ${color} ${block ? 'block' : ''}`}
      role="radiogroup"
      aria-labelledby={`${classPrefixList}${id}`}
    >
      {title && <p>{title} ({list.length})</p>}
      <div className="elements" ref={listContainerRef}>
        {list.map(element => {
          const selected = value === element;

          return (
            <div
              key={element}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              className={`${classPrefixListElement}basis ${disabled ? 'disabled' : ''}${selected ? 'selected' : ''}`}
              onClick={() => handleSelect(element)}
              title={element}
            >
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
