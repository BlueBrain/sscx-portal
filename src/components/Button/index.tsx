import React, { ReactChild, ReactFragment } from 'react';

import './style.less'

const classPrefix = 'button__'

export type Palette = 'warm' | 'cool';
type ButtonProps = {
  primary?: Palette;
  active?: boolean;
  notifications?: number;
  onClick: () => void;
  children: ReactChild | ReactFragment;
};

const Button: React.FC<ButtonProps> = ({ primary, active, notifications, onClick, children }) => {
  return <button onClick={onClick} className={`${classPrefix}${primary || (active ? 'active' : 'base')}`}>
    {children}
    {notifications && <span className={`${classPrefix}notifications`}>{notifications}</span>}
  </button>;
};

export default Button;
