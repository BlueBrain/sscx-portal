import React from 'react';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import NumberFormat from '../NumberFormat';

import Unit from '../Unit';

// import './style.scss';

const classPrefix = 'factsheet__';


type FactsheetEntryType = {
  name: string;
  description: string;
  unit?: string;
  value?: number | string;
  values?: number[];
  value_map?: {
    [key: string]: string | number;
  };
};


export type FactsheetProps = {
  facts: FactsheetEntryType[];
  className?: string;
  id?: string;
};

const FactsheetSingleValueEntry: React.FC<{
  fact: FactsheetEntryType;
}> = ({
  fact,
}) => (
  <div className="row mt-1">
    <div className="col-xs-6 col-md-4 name">{fact.name}</div>
    <div className="col-xs-6 col-md-4 value">
      {isNil(fact.value)
        ? (<span>-</span>)
        : (
          <span>
            <NumberFormat value={fact.value} /> <Unit value={fact} />
          </span>
        )}
    </div>
  </div>
);

const FactsheetSingleMeanStdEntry: React.FC<{
  fact: FactsheetEntryType;
}> = ({
  fact,
}) => (
  <div className="row mt-1">
    <div className="col-xs-6 col-md-4 name">{fact.name}</div>
    <div className="col-xs-6 col-md-4 value">
      {fact.value_map && (
        <>
          <NumberFormat value={fact.value_map.mean} /> ± <NumberFormat value={fact.value_map.std || 'NaN'} /> <Unit value={fact} />
        </>
      )}
      {fact.values && (
        <>
          <NumberFormat value={fact.values[0]} />&nbsp;
          {fact.values[1] && (
            <>
              ± <NumberFormat value={fact.values[1]} />&nbsp;
            </>
          )}
          <Unit value={fact} />
        </>
      )}
    </div>
  </div>
);

const FactsheetMapValueEntry: React.FC<{
  fact: FactsheetEntryType
}> = ({
  fact,
}) => {
  // @ts-ignore
  const maxVal = Math.max.apply(null, Object.values(fact.value_map).map(s => parseFloat(s as string)));
  const unitCode = fact.unit;

  // @ts-ignore
  const valueColumn = Object.entries(fact.value_map).filter(([, value]) => value !== 0).map(([label, value]) => {
    const barMaxFillRatio = 0.8;
    const barWidthPct = (parseFloat(value as string) / maxVal) * 100 * barMaxFillRatio;

    return (
      <div key={label} className="row mb-1">
        <div className="col-xs-6 pos-relative">
          {label}
          <div className="bar" style={{ width: `${barWidthPct}%` }} />
        </div>
        <div className="col-xs-6">
          <NumberFormat value={value} /> <Unit value={{ unit: unitCode, name: fact.name }} />
        </div>
      </div>
    );
  });

  return (
    <div className="row mt-1">
      <div className="col-sm-4 col-xs-6 name">{fact.name}</div>
      <div className="col-sm-8 col-xs-12">{valueColumn}</div>
    </div>
  );
};

const FactsheetEntry: React.FC<{
  fact: FactsheetEntryType
}> = ({
  fact,
}) => {
  if (
    (fact.values && fact.values.length)
    || (fact.value_map && !isUndefined(fact.value_map.mean) && !isUndefined(fact.value_map.std))
  ) {
    return (<FactsheetSingleMeanStdEntry fact={fact} />);
  }

  if (fact.value_map) {
    return (<FactsheetMapValueEntry fact={fact} />);
  }

  return (<FactsheetSingleValueEntry fact={fact} />);
};

const Factsheet: React.FC<FactsheetProps> = ({
  facts,
  className = '',
  id = '',
}) => (
  <div id={id} className={`${classPrefix}basis ${className}`}>
    {facts.map(fact => (
      <FactsheetEntry key={fact.name} fact={fact} />
    ))}
  </div>
);

export default Factsheet;
