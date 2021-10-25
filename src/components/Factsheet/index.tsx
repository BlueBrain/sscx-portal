import React from 'react';
import dynamic from 'next/dynamic';

import { FactsheetProps } from './Factsheet';


const FactsheetLazy = dynamic(() => import('./Factsheet'), { ssr: false });

const Factsheet: React.FC<FactsheetProps> = (props) => {
  return (
    <FactsheetLazy {...props} />
  );
};


export default Factsheet;
