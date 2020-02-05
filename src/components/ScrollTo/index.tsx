import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import { Direction, Palette } from '../../types';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/all';

const classPrefix = 'scroll-to__';

type ScrollToProps = {
  anchor: string;
  direction: Direction;
  children: ReactChild | ReactFragment;
  color?: string;
};

const ScrollTo: React.FC<ScrollToProps> = ({
  anchor,
  direction,
  children,
  color,
}) => {
  return (
    <a
      href={`#${anchor}`}
      className={`${classPrefix}basis`}
      style={{ backgroundColor: color }}
    >
      {children}
      <span className={`${classPrefix}direction`}>
        {direction === 'up' && <IoIosArrowUp />}
        {direction === 'down' && <IoIosArrowDown />}
      </span>
    </a>
  );
};

export default ScrollTo;
