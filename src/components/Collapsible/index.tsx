import React, { ReactChild, ReactFragment } from 'react';

import './style.less';

const classPrefix = 'collapsible__';

type CollapsibleProps = {
  collapsed?: boolean;
  title: string;
  children: ReactChild | ReactFragment;
};

const Collapsible: React.FC<CollapsibleProps> = ({ collapsed, title, children }) => {

  return <div className={`${classPrefix}${collapsed ? 'collapsed' : 'expanded'}`}>
    <div className='header'>{title}</div>
    <div className='body'>{children}</div>
  </div>;
};

export default Collapsible;
