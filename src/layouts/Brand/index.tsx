import React from 'react';
import EpflLogo from '../../assets/images/epfl-logo.svg';

import './style.less';

const classPrefix = 'brand__';


const Brand: React.FC = () => {
  return <div className={`${classPrefix}basis`}>
    <div className='svg'>
      <a href='https://www.epfl.ch/'>
        <EpflLogo/>
      </a>
    </div>
    <a href='/'>
      <h1>SSCx Portal</h1>
    </a>
  </div>;
};

export default Brand;
