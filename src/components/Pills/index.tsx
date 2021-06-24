import React from 'react';

// import './style.scss';
import { Color } from '../../types';

const classPrefixPills = 'pills__';
const classPrefixPill = 'pill__';

type PillsProps = {
  title?: string;
  list: string[];
  titles?: string[];
  defaultValue?: string;
  onSelect?: (s: string) => void;
  color?: Color;
  className?: string;
};

type PillProps = {
  element: string;
  selected: boolean;
  onSelect?: (s: string) => void;
  title?: string;
};

export const Pill: React.FC<PillProps> = ({ element, selected, onSelect, title }) => {
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      className={`${classPrefixPill}basis ${
        selected ? `${classPrefixPill}selected` : ''
      }`}
      onClick={() => onSelect && onSelect(element)}
      title={title}
    >
      {element}
    </div>
  );
};

const Pills: React.FC<PillsProps> = ({
  title,
  list,
  titles,
  defaultValue,
  onSelect,
  color = '',
  className = '',
}) => {
  const [activePill, setActivePill] = React.useState<string>(defaultValue as string);

  const handleSelectedPill = (element: string) => {
    setActivePill(element);
    onSelect && onSelect(element);
  };

  const id = title ? title.replace(/\s/g, '') : 'no_title';

  return (
    <div className={`${classPrefixPills}basis ${color} ${className}`}>
      {title && <p id={`${classPrefixPill}${id}`}>{title}</p>}
      <div
        className="elements"
        role="radiogroup"
        aria-labelledby={`${classPrefixPill}${id}`}
      >
        {list.map((el, index) => (
          <Pill
            key={el}
            element={el}
            title={titles ? titles[index] : undefined}
            selected={(activePill || defaultValue) === el}
            onSelect={handleSelectedPill}
          />
        ))}
      </div>
    </div>
  );
};

export default Pills;
