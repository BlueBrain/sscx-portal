import React from 'react';

import './style.less';

const classPrefix = 'title__';

type TitleProps = {
  primaryColor: string;
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
    <div className={`${classPrefix}basis`}>
      {subtitle && <h4 style={{ color: primaryColor }}>{subtitle}</h4>}
      <h2 role="title" style={{ borderLeft: `4px solid ${primaryColor}` }}>
        {title}
      </h2>
      {hint && <h3>{hint}</h3>}
    </div>
  );
};

export default Title;
