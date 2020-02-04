import React, { ReactChild, ReactFragment } from 'react';

import './style.less'

const classPrefix = 'button__'

export type Palette = 'warm' | 'cool';
type ButtonProps = {
  primary?: Palette;
  onClick: () => void;
  children: ReactChild | ReactFragment;
};

const Button: React.FC<ButtonProps> = ({ primary, onClick, children }) => {
  return <button onClick={onClick} className={`${classPrefix}${primary || 'base'}`}>
    {children}
  </button>;
};

export default Button;
