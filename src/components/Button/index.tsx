import React, { ReactChild, ReactFragment } from 'react';

// import './style.scss';

const classPrefix = 'button__';

type ButtonProps = {
  primary?: boolean;
  active?: boolean;
  large?: boolean;
  discrete?: boolean;
  width?: number;
  notifications?: number;
  onClick?: (e: any) => void;
  children: ReactChild | ReactFragment;
  uppercase?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  primary,
  active,
  discrete,
  width,
  notifications,
  onClick,
  children,
  large,
  uppercase,
  className = '',
}) => {
  return (
    <button
      style={{ width: width }}
      onClick={onClick}
      className={`${classPrefix}basis ${className} ${primary ? 'primary' : ''} ${
        discrete ? 'discrete' : ''
      } ${active ? 'active' : ''} ${large ? 'large' : ''} ${
        uppercase ? 'uppercase' : ''
      }`}
    >
      {children}
      {notifications && <span className="notifications">{notifications}</span>}
    </button>
  );
};

export default Button;
