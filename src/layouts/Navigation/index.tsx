import React from 'react';

import './style.less';
import Brand from '../Brand';
import NavDesktop from '../NavDesktop';
import NavMobile from '../NavMobile';

const classPrefix = 'nav__';

const Navigation: React.FC = () => {
  return <div role="navigation" className={`${classPrefix}basis`}>
    <Brand />
    <NavDesktop />
    <NavMobile/>
  </div>;
};

export default Navigation;
