import React from 'react';

export type LayerThicknessProps = {
  data?: {}[];
};

const LayerThickness: React.FC<LayerThicknessProps> = ({ data = [] }) => {
  const validData = data.filter(d =>
    d['_source']['@type'].includes('https://neuroshapes.org/NeuronDensity'),
  );

  return (
    <>
      {validData.map(d => (
        <>
          {d['_source'].series.map &&
            d['_source'].series.map(s => (
              <p>
                {s.statistic}: {s.value['@value']} {s.unitCode}
              </p>
            ))}
        </>
      ))}
    </>
  );
};

export default LayerThickness;
