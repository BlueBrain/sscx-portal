import React, { ReactChild, ReactFragment } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { Direction, Color } from '../../types';

// import './style.scss';


const classPrefix = 'scroll-to__';

type ScrollToProps = {
  anchor: string;
  direction: Direction;
  children: ReactChild | ReactFragment;
  color?: Color;
  animated?: boolean;
};

const ScrollTo: React.FC<ScrollToProps> = ({
  anchor,
  direction,
  children,
  color = '',
  animated = false,
}) => {
  const scroll = () => {
    const target = document.querySelector(`#${anchor}`);
    if (target) {
      target.scrollIntoView();
    }
  };

  return (
    <div onClick={scroll} className={`${classPrefix}basis ${color} ${animated ? 'animated' : ''}`}>
      {children}
      <span className={`${classPrefix}direction`}>
        {direction === 'up' && <IoIosArrowUp />}
        {direction === 'down' && <IoIosArrowDown />}
      </span>
    </div>
  );
};

export default ScrollTo;
