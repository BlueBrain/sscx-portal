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
          <span className="text-capitalize text-nowrap">
            {layerThickness.layer}
          </span>
          <br />
        </div>
      ))}
    </td>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-nowrap">
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
            <NumberFormat value={layerThickness.std} prefix="± " />
          </span>
          <br />
        </div>
      ))}
    </td>
    <td className="no-border">
      {layerThicknesses.map(layerThickness => (
        <div key={layerThickness.layer}>
          <span className="text-nowrap">
            <NumberFormat value={layerThickness.n} prefix="n=" />
          </span>
          <br />
        </div>
      ))}
    </td>
  </>
);

export default SliceRow;
