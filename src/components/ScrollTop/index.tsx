import React from 'react';

import './style.less';
import { IoIosArrowUp } from 'react-icons/all';

const classPrefix = 'scroll-top__';

type ScrollTopProps = {
  anchor: string;
};

const ScrollTop: React.FC<ScrollTopProps> = ({ anchor }) => {
  return (
    <a href={`#${anchor}`} className={`${classPrefix}base`}>
      <IoIosArrowUp />
    </a>
  );
};

export default ScrollTop;
