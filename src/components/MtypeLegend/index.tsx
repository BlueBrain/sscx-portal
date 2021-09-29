import React from 'react';

import colorMap from './colormap';

import style from './styles.module.scss';


type MtypeLegendProps = {
  className?: string;
};

const getCellBgColorStr = (rgb: number[]) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

const MtypeLegend: React.FC<MtypeLegendProps> = ({ className }) => {
  return (
    <div id="mtypeLegend" className={className}>
      <h2>M-type legend</h2>

      <div className={`row ${style.container}`}>
        {colorMap.map(entry => (
          <div
            className="text-center col-xs-2 col-sm mt-1"
            key={entry.color.join('')}
          >
            <div
              className={style.colorBlock}
              style={{ backgroundColor: getCellBgColorStr(entry.color) }}
            />
            {entry.mtypes.map(mtype => (
              <div
                className={style.label}
                key={mtype}
              >
                {mtype}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};


export default MtypeLegend;
