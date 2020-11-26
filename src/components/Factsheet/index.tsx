import React from 'react';
import NumberFormat from '../NumberFormat';

import './style.less';


const classPrefix = 'factsheet__';

export type FactsheetEntry = {
  unit: string;
  name: string;
  value: any;
  tooltip: string;
}

type FactsheetProps = {
  facts: FactsheetEntry[];
};


const FactsheetEntry: React.FC<{
  fact: FactsheetEntry;
}> = ({ fact }) => {
  return (
    <div className="row mt-1">
      <div className="col-xs-4 name">{fact.name}</div>
      <div className="col-xs-4 value">
        <NumberFormat value={fact.value} /> {fact.unit}
      </div>
    </div>
  );
};

const Factsheet: React.FC<FactsheetProps> = ({
  facts,
}) => {
  return (
    <div className={`${classPrefix}basis`}>
      {facts.map(fact => (
        <FactsheetEntry key={fact.name} fact={fact} />
      ))}
    </div>
  );
};

export default Factsheet;
