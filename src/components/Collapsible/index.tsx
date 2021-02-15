import React, { ReactChild, ReactFragment } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

// import './style.scss';


const classPrefix = 'collapsible__';

type CollapsibleColor = 'red'

type CollapsibleProps = {
  collapsed?: boolean;
  title: string;
  children: ReactChild | ReactFragment;
  color?: CollapsibleColor;
  className?: string;
};

const Collapsible: React.FC<CollapsibleProps> = ({
  collapsed,
  title,
  children,
  color = '',
  className = '',
}) => {
  const [isCollapsed, setCollapsed] = React.useState(collapsed);

  return (
    <div id="data" className={`${classPrefix}${isCollapsed ? 'collapsed' : 'expanded'} ${color} ${className}`}>
      <div onClick={() => setCollapsed(!isCollapsed)} className="header">
        {title}
        <span className="arrow">
          <IoIosArrowUp />
        </span>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Collapsible;
