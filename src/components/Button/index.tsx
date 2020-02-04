import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import { Palette } from '../../types';

const classPrefix = 'button__';

type ButtonProps = {
  primary?: Palette;
  active?: boolean;
  notifications?: number;
  onClick: () => void;
  children: ReactChild | ReactFragment;
};

const Button: React.FC<ButtonProps> = ({
  primary,
  active,
  notifications,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${classPrefix}${primary || (active ? 'active' : 'base')}`}
    >
      {children}
      {notifications && (
        <span className={`${classPrefix}notifications`}>{notifications}</span>
      )}
    </button>
  );
};

export default Button;
