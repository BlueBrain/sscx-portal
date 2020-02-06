import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import ScrollTo from '../../components/ScrollTo';

const classPrefix = 'filters__';

type FiltersProps = {
  primaryColor: string;
  children: ReactChild | ReactFragment;
  backgroundAlt?: boolean;
};

const Filters: React.FC<FiltersProps> = ({ primaryColor, children, backgroundAlt }) => {

  return (
    <>
      <div className={`${classPrefix}basis ${backgroundAlt ? 'background-alt' : ''}`}>
        <div className="center">{children}</div>
        <div className="scroll-to">
          <ScrollTo anchor="bottom" color={primaryColor} direction="down">
            View data
          </ScrollTo>
        </div>
      </div>
    </>
  );
};

export default Filters;
