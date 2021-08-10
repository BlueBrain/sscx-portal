import React from 'react';
import NumberFormat from '../NumberFormat';

type SliceRowProps = {
    layerThicknesses: Array<{
      layer: string,
      mean: string;
      std: string;
      n: string;
    }>
  };

const SliceRow: React.FC<SliceRowProps> = ({ layerThicknesses }) => (
  <>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-capitalize text-nowrap mr-2">
            {layerThickness.layer}
          </span>
          <br />
        </div>
      ))}
    </td>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-nowrap mr-2">
            <NumberFormat value={layerThickness.mean} />
          </span>
          <br />
        </div>
      ))}
    </td>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-nowrap">
            <NumberFormat value={layerThickness.std} prefix="± " />&nbsp;&nbsp;
          </span>
          <br />
        </div>
      ))}
    </td>
  </>
);

export default SliceRow;
