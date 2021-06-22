import React from 'react';

import { Layer } from '../../types';

import style from './styles.module.scss';

const layerSvgContent = {
  L1: <>
    <path d="m2.6 15.5v33.9l34.5 12 75 .7 39.7-11.8v-33.8l-39.3 11.6-75.1-.6z" />
    <text transform="translate(70.2666 51.256)">L1</text>
  </>,
  L23: <>
    <path d="m2.6 50.9v70.3l34.5 12 75 .7 39.7-11.8v-70.2l-39.3 11.6-75.1-.5z" />
    <text transform="translate(64.4551 105.9827)">L2/3</text>
  </>,
  L4: <>
    <path d="m2.6 123.4v33.9l34.5 12 75 .7 39.7-11.8v-33.8l-39.3 11.6-75.1-.5z" />
    <text transform="translate(70.2666 157.8626)">L4</text>
  </>,
  L5: <>
    <path d="m2.6 159.4v33.8l34.5 12 75 .7 39.7-11.8v-33.8l-39.3 11.6-75.1-.5z" />
    <text transform="translate(70.2666 193.134)">L5</text>
  </>,
  L6: <>
    <path d="m2.6 195.3v33.8l34.5 12 75 .7 39.7-11.8v-33.8l-39.3 11.6-75.1-.5z" />
    <text transform="translate(70.2666 229.2864)">L6</text>
  </>,
};


type MicrocircuitLayerSelectorProps = {
  color: string;
  value?: Layer;
  onSelect?: (layer: Layer) => void;
  maxWidth?: string;
};

const MicrocircuitSelector: React.FC<MicrocircuitLayerSelectorProps> = ({
  color,
  value: currentLayer,
  onSelect = () => {},
  maxWidth,
}) => {
  const selectLayer = layer => onSelect(layer);

  const isLayerSelected = (layer: string) => layer === currentLayer;

  return (
    <svg
      className={`${style.svg} set-accent-color--${color}`}
      style={{ maxWidth }}
      enableBackground="new 0 0 155 245"
      width="100%"
      viewBox="0 0 155 245"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <image
        height="1285"
        width="1207"
        transform="matrix(.24 0 0 .24 -71.461 -24.8222)"
        href="/sscx-portal/assets/images/selectors/microcircuit-layer-selector-bg.png"
      />
      <g fontSize="11.8561">
        {Object.entries(layerSvgContent).map(([layer, svgContent]) => (
          <g
            key={layer}
            className={`${style.layer} ${isLayerSelected(layer) ? style.selected : ''}`}
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
