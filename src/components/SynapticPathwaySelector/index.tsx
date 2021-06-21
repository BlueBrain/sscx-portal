import React from 'react';
import noop from 'lodash/noop';

import { Layer } from '../../types';

import styles from './styles.module.scss';


export type SynapticPathwaySelectProps = {
  color: string;
  preLayer?: Layer;
  postLayer?: Layer;
  onPreLayerSelect?: (layer: Layer) => void;
  onPostLayerSelect?: (layer: Layer) => void;
  maxWidth?: string;
};

const selectorPathDefinitions = {
  pre: {
    'L1': 'm3 15.2 34.3 12.3v33.7l-34.3-12z',
    'L23': 'm3 50.7 34.3 12.3v70.1l-34.3-12z',
    'L4': 'm3 122.8 34.3 12.3v34l-34.3-12z',
    'L5': 'm3 158.7 34.3 12.3v34l-34.3-12.1z',
    'L6': 'm3 194.7 34.3 12.3v34l-34.3-12z',
  },
  post: {
    'L1': 'm112.3 28.1v33.8l39.7-11.6v-34z',
    'L23': 'm112.5 63.8v70l39.7-11.6v-70.2z',
    'L4': 'm112.5 135.9v33.8l39.7-11.6v-34z',
    'L5': 'm112.5 172v33.8l39.7-11.6v-34z',
    'L6': 'm112.5 207.8v33.8l39.7-11.6v-34z',
  },
};

const SynapticPathwaySelector: React.FC<SynapticPathwaySelectProps> = ({
  color,
  preLayer,
  onPreLayerSelect = noop,
  postLayer,
  onPostLayerSelect = noop,
  maxWidth,
}) => {
  const selectPreLayer = layer => onPreLayerSelect(layer);
  const selectPostLayer = layer => onPostLayerSelect(layer);

  const isPreLayerSelected = layer => layer === preLayer;
  const isPostLayerSelected = layer => layer === postLayer;

  return (
    <svg
      className={styles.svg}
      style={{ maxWidth }}
      enableBackground="new 0 0 155 245"
      viewBox="0 0 155 245"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <image
        height="1285"
        overflow="visible"
        transform="matrix(.24 0 0 .24 -71.0247 -24.9962)"
        width="1207"
        xlinkHref="/sscx-portal/assets/images/selectors/pathway-selector-bg.png"
      />

      <g fontSize="11.8561">
        <text transform="translate(70.7028 51.0821)">L1</text>
        <text transform="translate(64.8913 105.8087)">L2/3</text>
        <text transform="translate(70.7028 157.6886)">L4</text>
        <text transform="translate(70.7028 192.96)">L5</text>
        <text transform="translate(70.7028 229.1124)">L6</text>
      </g>

      <g className={`${styles.pre} set-accent-color--${color}`}>
        {Object.entries(selectorPathDefinitions.pre).map(([layer, pathDefinition]) => (
          <path
            key={layer}
            d={pathDefinition}
            className={`${styles.layer} ${isPreLayerSelected(layer) ? styles.selected : ''}`}
            onClick={() => selectPreLayer(layer)}
          ></path>
        ))}
      </g>

      <g className={`${styles.post} set-secondary-accent-color--orange`}>
        {Object.entries(selectorPathDefinitions.post).map(([layer, pathDefinition]) => (
          <path
            key={layer}
            d={pathDefinition}
            className={`${styles.layer} ${isPostLayerSelected(layer) ? styles.selected : ''}`}
            onClick={() => selectPostLayer(layer)}
          ></path>
        ))}
      </g>
    </svg>
  );
};

export default SynapticPathwaySelector;
