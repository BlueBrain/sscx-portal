import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import { Direction, Palette } from '../../types';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/all';

const classPrefix = 'scroll-to__';

type ScrollToProps = {
  anchor: string;
  palette: Palette;
  direction: Direction;
  children: ReactChild | ReactFragment;
};

const ScrollTo: React.FC<ScrollToProps> = ({
  anchor,
  palette,
  direction,
  children,
}) => {
  return (
    <a href={`#${anchor}`} className={`${classPrefix}${palette}`}>
      {children}
      <span className={`${classPrefix}direction`}>
        {direction === 'up' && <IoIosArrowUp />}
        {direction === 'down' && <IoIosArrowDown />}
      </span>
    </a>
  );
};

export default ScrollTo;
