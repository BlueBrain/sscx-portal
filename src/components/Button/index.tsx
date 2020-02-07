import React, { ReactChild, ReactFragment } from 'react';

import './style.less';

const classPrefix = 'button__';

type ButtonProps = {
  primary?: boolean;
  active?: boolean;
  discrete?: boolean;
  width?: number;
  notifications?: number;
  onClick?: (any) => void;
  children: ReactChild | ReactFragment;
};

const Button: React.FC<ButtonProps> = ({
  primary,
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
      className={`${classPrefix}basis ${primary ? 'primary' : ''} ${
        discrete ? 'discrete' : ''
      } ${active ? 'active' : ''}`}
    >
      {children}
      {notifications && <span className="notifications">{notifications}</span>}
    </button>
  );
};

export default Button;
