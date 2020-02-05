import React, { ReactChild, ReactFragment } from 'react';

import './style.less';
import Background from '../../assets/images/experimental-bg.svg';
import { renderToStaticMarkup } from 'react-dom/server';
import ScrollTo from '../../components/ScrollTo';

const classPrefix = 'filters__';

type FiltersProps = {
  primaryColor: string;
  children: ReactChild | ReactFragment;
};

const Filters: React.FC<FiltersProps> = ({ primaryColor, children }) => {
  const bg = renderToStaticMarkup(<Background />);

  return (
    <>
      <div className={`${classPrefix}basis`} style={{ backgroundImage: bg }}>
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
