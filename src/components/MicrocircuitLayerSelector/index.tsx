import React from 'react';

import { Layer } from '../../types';

import style from './styles.module.scss';


const layerSvgContent = {
  L1: <>
    <path d="M146.1026,15.7379C144.4,22.0844,114.3405,27.1391,77.5,27.1391c-37.2308,0-67.5215-5.163-68.632-11.604V49.6762h.01a.5579.5579,0,0,0-.01.1273c0,6.4911,20.8625,12.6917,68.5412,12.3518,46.4377-.3311,68.7228-5.8607,68.7228-12.3518a2.0231,2.0231,0,0,0-.0294-.3427Z" transform="translate(0.0296 0.0968)" />
    <text transform="translate(70.9363 48.5494)">L1</text>
  </>,
  L23: <>
    <path d="M146.1026,54.5987C144.4,60.9452,114.3405,66,77.5,66c-37.2308,0-67.5215-5.163-68.632-11.604V122.26h.01a.5579.5579,0,0,0-.01.1273c0,6.4912,28.5689,11.7679,68.632,11.7679,40.0729,0,68.632-5.4149,68.632-11.906a2.0231,2.0231,0,0,0-.0294-.3427Z" transform="translate(0.0296 0.0968)" />
    <text transform="translate(65.9924 103.6349)">L2/3</text>
  </>,
  L4: <>
    <path d="M146.1026,126.6834C144.4,133.03,114.3405,138.0846,77.5,138.0846c-37.2308,0-67.5215-5.163-68.632-11.604v34.1411h.01a.5579.5579,0,0,0-.01.1273c0,6.4911,20.8625,12.6917,68.5412,12.3518,46.4377-.3311,68.7228-5.8607,68.7228-12.3518a2.0231,2.0231,0,0,0-.0294-.3427Z" transform="translate(0.0296 0.0968)" />
    <text transform="translate(70.9363 159.4949)">L4</text>
  </>,
  L5: <>
    <path d="M146.1026,165.5981C144.4,171.9446,114.3405,176.9993,77.5,176.9993c-37.2308,0-67.5215-5.163-68.632-11.6039v34.141h.01a.5579.5579,0,0,0-.01.1273c0,6.4912,20.8625,12.6918,68.5412,12.3518,46.4377-.3311,68.7228-5.8606,68.7228-12.3518a2.021,2.021,0,0,0-.0294-.3426Z" transform="translate(0.0296 0.0968)" />
    <text transform="translate(70.9363 198.4096)">L5</text>
  </>,
  L6: <>
    <path d="M146.1026,204.3852C144.4,210.7317,114.3405,215.7864,77.5,215.7864c-37.2308,0-67.5215-5.163-68.632-11.604v34.1411h.01a.5579.5579,0,0,0-.01.1273c0,6.4911,20.8625,12.6917,68.5412,12.3518,46.4377-.3311,68.7228-5.8607,68.7228-12.3518a2.0231,2.0231,0,0,0-.0294-.3427Z" transform="translate(0.0296 0.0968)" />
    <text transform="translate(70.9355 237.1967)">L6</text>
  </>,
};

type MicrocircuitLayerSelectorProps = {
  color: string;
  value?: Layer;
  onSelect?: (layer: Layer) => void;
  size?: 'small'|'large';
  disabled?: boolean;
};

const MicrocircuitSelector: React.FC<MicrocircuitLayerSelectorProps> = ({
  color,
  value: currentLayer,
  onSelect = () => {},
  size = 'large',
  disabled,
}) => {
  const selectLayer = layer => {
    if (!disabled) {
      onSelect(layer);
    }
  };

  const isLayerSelected = (layer: string) => layer === currentLayer;

  return (
    <svg
      className={`${style.svg} ${style[size]} set-accent-color--${color}`}
      width="100%"
      viewBox="0 0 154.9783 254.0094"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <image
        width="1000"
        height="1639"
        transform="scale(0.155)"
        href="/sscx-portal/assets/images/selectors/microcircuit-layer-selector-bg.png"
      />
      <g fontSize="11.8561">
        {Object.entries(layerSvgContent).map(([layer, svgContent]) => (
          <g
            key={layer}
            className={`${style.layer} ${disabled ? style.disabled : ''} ${isLayerSelected(layer) ? style.selected : ''}`}
            onClick={() => selectLayer(layer)}
          >
            {svgContent}
          </g>
        ))}
      </g>
    </svg>
  );
};


export default MicrocircuitSelector;
