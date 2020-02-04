import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import { IoIosArrowUp } from 'react-icons/all';

const classPrefix = 'collapsible__';

type CollapsibleProps = {
  collapsed?: boolean;
  title: string;
  children: ReactChild | ReactFragment;
};

const Collapsible: React.FC<CollapsibleProps> = ({ collapsed, title, children }) => {
  const [isCollapsed, setCollapsed] = React.useState(collapsed);

  return <div className={`${classPrefix}${isCollapsed ? 'collapsed' : 'expanded'}`}>
    <div onClick={() => setCollapsed(!isCollapsed)} className='header'>
      {title}
      <span className='arrow'><IoIosArrowUp /></span>
    </div>
    <div className='content'>{children}</div>
  </div>;
};

export default Collapsible;
