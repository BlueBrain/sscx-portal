import React from 'react';

import './style.less';

const classPrefix = 'brand__';

const Brand: React.FC = () => {
  return (
    <div className={`${classPrefix}basis`}>
      <div className="logo">
        <a href="https://www.epfl.ch/">
          <img
            src={require('url:../../assets/images/epfl-logo.svg')}
            alt="EPFL logo"
          />
        </a>
      </div>
      <a href="/">
        <h1 className="text-white" >SSCx Portal</h1>
      </a>
    </div>
  );
};

export default Brand;
