import React from 'react';

import { Color } from '../../types';
import './style.less';

const classPrefix = 'title__';

type TitleProps = {
  primaryColor: Color;
  subtitle?: string;
  title: string;
  hint?: string;
};

const Title: React.FC<TitleProps> = ({
  primaryColor,
  subtitle,
  title,
  hint,
}) => {
  return (
    <div className={`${classPrefix}basis ${primaryColor}`}>
      {subtitle && <h4>{subtitle}</h4>}
      <h2 role="title">{title}</h2>
      {hint && <h3>{hint}</h3>}
    </div>
  );
};

export default Title;
