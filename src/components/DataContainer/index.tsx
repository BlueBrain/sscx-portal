import React from 'react';

import SectionNav from '../../layouts/SectionNav';
import ScrollTo from '../../components/ScrollTo';
import ScrollTop from '../../components/ScrollTop';


const classPrefix = 'data-container__';

type NavItem = {
  id: string;
  label: string;
}

type DataContainerProps = {
  visible?: boolean;
  children: React.ReactNode;
  navItems?: NavItem[];
};

const DataContainer: React.FC<DataContainerProps> = ({
  visible = true,
  children,
  navItems,
}) => {
  return (
    <>
      {visible && (
        <div id="data" className={`${classPrefix}basis`}>
          {navItems && (
            <SectionNav navItems={navItems} />
          )}
          <div className="scroll-top">
            <ScrollTop />
          </div>
          <div className="center">{children}</div>
          <div className="scroll-to">
            <ScrollTo anchor="filters" direction="up">
              Return to selectors
            </ScrollTo>
          </div>
        </div>
      )}
    </>
  );
};

export default DataContainer;
