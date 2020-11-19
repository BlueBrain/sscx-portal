
import React from 'react';

import ScrollTo from '../../components/ScrollTo';
import './style.less';


const classPrefix = 'data-result__';

type DataProps = {
  children: React.ReactNode
};

const Data: React.FC<DataProps> = ({
  children,
}) => {
  return (
    <>
      <div className={`${classPrefix}basis`}>
        <div className="center">{children}</div>
        <div className="scroll-to">
          <ScrollTo anchor="filters" direction="up">
            Return to filters
          </ScrollTo>
        </div>
      </div>
    </>
  );
};

export default Data;
