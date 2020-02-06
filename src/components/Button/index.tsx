import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import { Palette } from '../../types';

const classPrefix = 'button__';

type ButtonProps = {
  primary?: boolean;
  palette: Palette;
  active?: boolean;
  discrete?: boolean;
  width?: number;
  notifications?: number;
  onClick?: (any) => void;
  children: ReactChild | ReactFragment;
};

const Button: React.FC<ButtonProps> = ({
  primary,
  palette,
  active,
  discrete,
  width,
  notifications,
  onClick,
  children,
}) => {
  return (
    <button
      style={{ width: width }}
      onClick={onClick}
      className={`${classPrefix}${palette}${primary ? '-primary' : ''}${
        discrete ? '-discrete' : ''
      }${active ? '-active' : ''}`}
    >
      {children}
      {notifications && (
        <span className={`${classPrefix}${palette}-notifications`}>
          {notifications}
        </span>
      )}
    </button>
  );
};

export default Button;
