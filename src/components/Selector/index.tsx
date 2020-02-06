import React, { ReactChild, ReactFragment } from 'react';

import './style.less';

const classPrefix = 'selector__';

type SelectorProps = {
  title?: string;
  children: ReactChild | ReactFragment;
};

const Selector: React.FC<SelectorProps> = ({
                                             title,
                                             children,
                                           }) => (
  <div className={`${classPrefix}basis`}>
    {title && <p>{title}</p>}
    {children}
  </div>
);

export default Selector;
