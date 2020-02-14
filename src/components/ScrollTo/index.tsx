import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import { Direction, Palette, Color } from '../../types';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/all';

const classPrefix = 'scroll-to__';

type ScrollToProps = {
  anchor: string;
  direction: Direction;
  children: ReactChild | ReactFragment;
  color?: Color;
};

const ScrollTo: React.FC<ScrollToProps> = ({
  anchor,
  direction,
  children,
  color = '',
}) => {
  return (
    <a href={`#${anchor}`} className={`${classPrefix}basis ${color}`}>
      {children}
      <span className={`${classPrefix}direction`}>
        {direction === 'up' && <IoIosArrowUp />}
        {direction === 'down' && <IoIosArrowDown />}
      </span>
    </a>
  );
};

export default ScrollTo;
