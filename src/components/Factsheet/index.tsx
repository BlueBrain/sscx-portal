import React from 'react';
import NumberFormat from '../NumberFormat';

import './style.less';


const classPrefix = 'factsheet__';


type FactsheetEntryType = {
  name: string;
  description: string;
  unit?: string;
  value?: number | string;
  value_map?: {
    [key: string]: string | number;
  };
};


type FactsheetProps = {
  facts: FactsheetEntryType[];
  className?: string;
};


const FactsheetSingleValueEntry: React.FC<{
  fact: FactsheetEntryType;
}> = ({
  fact
}) => {
  return (
    <div className="row mt-1">
      <div className="col-xs-4 name">{fact.name}</div>
      <div className="col-xs-4 value">
        <NumberFormat value={fact.value} /> {fact.unit}
      </div>
    </div>
  );
};

const FactsheetMapValueEntry: React.FC<{
  fact: FactsheetEntryType
}> = ({
  fact,
}) => {
  const maxVal = Math.max.apply(null, Object.values(fact.value_map).map(s => parseFloat(s as string)));
  const unitCode = fact.unit;

  const valueColumn = Object.entries(fact.value_map).map(([label, value]) => {
    const barMaxFillRatio = 0.8;
    const barWidthPct = (parseFloat(value as string) / maxVal) * 100 * barMaxFillRatio;

    return (
      <div key={label} className="row mb-1">
        <div className="col-xs-6 pos-relative">
          {label}
          <div className="bar" style={{ width: `${barWidthPct}%` }} />
        </div>
        <div className="col-xs-6">
          <NumberFormat value={value}/> {unitCode}
        </div>
      </div>
    );
  });

  return (
    <div className="row mt-1">
      <div className="col-xs-4 name">{fact.name}</div>
      <div className="col-xs-8">{valueColumn}</div>
    </div>
  );
};

const FactsheetEntry: React.FC<{
  fact: FactsheetEntryType
}> = ({
  fact
}) => {
  return fact.value_map
    ? (<FactsheetMapValueEntry fact={fact} />)
    : (<FactsheetSingleValueEntry fact={fact} />);
};

const Factsheet: React.FC<FactsheetProps> = ({
  facts,
  className = '',
}) => {
  return (
    <div className={`${classPrefix}basis ${className}`}>
      {facts.map(fact => (
        <FactsheetEntry key={fact.name} fact={fact} />
      ))}
    </div>
  );
};

export default Factsheet;
