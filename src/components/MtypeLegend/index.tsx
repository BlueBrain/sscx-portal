import React from 'react';
import { uniq } from 'lodash';

import mtypeColormap from '../../mtype-colormap.json';

import style from './styles.module.scss';


type MtypeLegendProps = {
  className?: string;
};

const mtypeLayerRe = /^(L\d+)*/;

const MtypeLegend: React.FC<MtypeLegendProps> = ({ className }) => {
  const mtypeCollection = Object.entries(mtypeColormap)
    .map(([mtype, rgb]) => {
      const mtypeLayer = mtype.match(mtypeLayerRe)[1];
      const layer = mtypeLayer.match(/2|3/) ? 'L23' : mtypeLayer;

      return {
        mtype,
        layer,
        rgb,
        rgbKey: rgb.join('_'),
      }
    })
    .sort((color1, color2) => color1.mtype < color2.mtype ? -1 : 1);

  const rgbKeys = uniq(mtypeCollection.map(o => o.rgbKey)).sort();
  const layers = uniq(mtypeCollection.map(o => o.layer)).sort();

  const mtypeCollectionGrouped = {};
  mtypeCollection.forEach(mtype => {
    const { layer, rgbKey } = mtype;

    if (!mtypeCollectionGrouped[layer]) {
      mtypeCollectionGrouped[layer] = {};
    }

    if (!mtypeCollectionGrouped[layer][rgbKey]) {
      mtypeCollectionGrouped[layer][rgbKey] = [mtype];
    } else {
      mtypeCollectionGrouped[layer][rgbKey].push(mtype);
    }
  });

  const getCellBgColorStr = (rgbKey) => {
    const rgb = rgbKey.split('_').map(numStr => parseInt(numStr, 10));
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  };

  return (
    <div id="mtypeLegend" className={className}>
      <h2>M-type legend</h2>
      <div className={style.containerDesktop}>
        {layers.map(layer => (
          <div key={layer} className={style.row}>
            <div className="row">
              {rgbKeys.map(rgbKey => (
                <div key={rgbKey} className="col-xs-2 col-sm mt-1 mb-1">
                  {!!mtypeCollectionGrouped[layer][rgbKey] && (
                    <>
                      <div className={style.colorBlock} style={{ backgroundColor: getCellBgColorStr(rgbKey) }} />
                      {mtypeCollectionGrouped[layer][rgbKey].map(mtype => (
                        <div className={style.label} key={mtype.mtype}>{mtype.mtype}</div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={style.containerMobile}>
        {rgbKeys.map(rgbKey => (
          <div key={rgbKey} className={style.row}>
            <div className="row">
              {layers.map(layer => (
                <div key={layer} className="col-xs-2 col-sm mt-1 mb-1">
                  {!!mtypeCollectionGrouped[layer][rgbKey] && (
                    <>
                      <div className={style.colorBlock} style={{ backgroundColor: getCellBgColorStr(rgbKey) }} />
                      {mtypeCollectionGrouped[layer][rgbKey].map(mtype => (
                        <div className={style.label} key={mtype.mtype}>{mtype.mtype}</div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MtypeLegend;
