import React from 'react';

import { Color } from '../../types';


const classPrefix = 'title__';

type TitleProps = {
  title?: React.ReactChild;
  subtitle?: string;
  primaryColor?: Color;
  hint?: string | React.ReactNode;
  primary?: boolean;
};

const Title: React.FC<TitleProps> = ({
  title,
  subtitle,
  hint,
  primaryColor = 'yellow' as Color,
  primary,
}) => {
  return (
    <div
      className={`${classPrefix}basis ${
        primary ? 'primary' : ''
      } ${primaryColor}`}
    >
      {subtitle && !primary && <h4 className="text-white">{subtitle}</h4>}
      {title && <h2 role="title" className="text-white">{title}</h2>}
      {subtitle && primary && <h4 className="text-white">{subtitle}</h4>}
      {<div className="hint text-high-white">{hint}</div>}
    </div>
  );
};

export default Title;
