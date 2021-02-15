import React from 'react';

import ScrollTo from '../../components/ScrollTo';
import { liveContent } from '../../config';
// import './style.scss';


const classPrefix = 'data-container__';

type DataContainerProps = {
  visible?: boolean;
  children: React.ReactNode
};

const DataContainer: React.FC<DataContainerProps> = ({
  visible = true,
  children,
}) => {
  return (
    <>
      {visible && (
        <div className={`${classPrefix}basis`}>
          {liveContent ? (
            <div className="center">{children}</div>
          ) : (
            <div className="text-center mt-4 mb-4">
              <h2>Live content disabled</h2>
            </div>
          )}
          <div className="scroll-to">
            <ScrollTo anchor="filters" direction="up">
              Return to filters
            </ScrollTo>
          </div>
        </div>
      )}
    </>
  );
};

export default DataContainer;
