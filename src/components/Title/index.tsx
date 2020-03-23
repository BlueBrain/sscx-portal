import React from 'react';

import { Color } from '../../types';
import './style.less';

const classPrefix = 'title__';

type TitleProps = {
  title: string;
  subtitle?: string;
  primaryColor?: Color;
  hint?: string;
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
      {subtitle && !primary && <h4>{subtitle}</h4>}
      <h2 role="title">{title}</h2>
      {subtitle && primary && <h4>{subtitle}</h4>}
      {hint && <p dangerouslySetInnerHTML={{ __html: hint }} />}
    </div>
  );
};

export default Title;
