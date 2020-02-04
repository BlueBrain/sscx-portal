import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import { Palette } from '../../types';

const classPrefix = 'icon__';

type IconProps = {
  background: Palette | string;
  color?: string;
  children: ReactChild | ReactFragment;
};

const Icon: React.FC<IconProps> = ({ background, color, children }) => {
  return (
    <span
      className={`${classPrefix}${background}`}
      style={{ color, background }}
    >
      {children}
    </span>
  );
};

export default Icon;
