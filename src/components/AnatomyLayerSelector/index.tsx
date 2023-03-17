import React from 'react';

import { basePath } from '@/config';
import { Layer } from '../../types';

import styles from './styles.module.scss';


const layerSvgContent: Record<Layer, React.ReactNode> = {
  L1: <>
    <path d="m6.4 23.6 10.6 31.6c5.9-.4 62.3-14.5 139.5 13.5l6.9-37.4c-.1.1-75.2-28.5-157-7.7z" />
    <text transform="matrix(1.0274 0 0 1 81.8838 40.1914)">L1</text>
  </>,
  L23: <>
    <path d="m16.6 57.1 19.6 66.2s43.9-7.8 104.2 12.4l15.9-65.8c.1 0-68.4-27.3-139.7-12.8z" />
    <text transform="matrix(1.0274 0 0 1 76.334 93.4707)">L2/3</text>
  </>,
  L4: <>
    <path d="m37.4 124.9 9.7 37.8s35.4-3.5 84.2 11.5l8.9-37.1s-53.4-18.1-102.8-12.2z" />
    <text transform="matrix(1.0274 0 0 1 81.8838 148.9795)">L4</text>
  </>,
  L5: <>
    <path d="m130.8 175.9-8.1 32.7s-40.8-11.1-66.8-7.8l-8.6-36.7c.1.1 46.4-.3 83.5 11.8z" />
    <text transform="matrix(1.0274 0 0 1 81.8838 187.0791)">L5</text>
  </>,
  L6: <>
    <path d="m122.4 210.2-7.5 30.3s-24.9-3.1-50.4 1.2l-8-39.3c-.1 0 24.7-3 65.9 7.8z" />
    <text transform="matrix(1.0274 0 0 1 81.8838 225.5576)">L6</text>
  </>,
};

type AnatomyLayerSelectorProps = {
  color: string;
  value?: Layer;
  onSelect?: (layer: Layer) => void;
};

const AnatomyLayerSelector: React.FC<AnatomyLayerSelectorProps> = ({
  color,
  value: currentLayer,
  onSelect = () => {},
}) => {
  const selectLayer = (l: Layer): void => onSelect(l);

  const isLayerSelected = (layer: string) => layer === currentLayer;

  return (
    <svg
      className={`${styles.svg} set-accent-color--${color}`}
      enableBackground="new 0 0 190 250"
      width="100%"
      viewBox="0 0 190 250"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <image
        height="1282"
        width="1207"
        transform="matrix(.24 0 0 .24 -50.0485 -39.622)"
        href={`${basePath}/assets/images/selectors/layer-selector-bg.png`}
      />
      <g fontSize="12.9532">
        {Object.entries(layerSvgContent).map(([layer, svgContent]) => (
          <g
            key={layer}
            className={`${styles.layer} ${isLayerSelected(layer) ? styles.selected : ''}`}
            onClick={() => selectLayer(layer as Layer)}
          >
            {svgContent}
          </g>
        ))}
      </g>
    </svg>
  );
};

export default AnatomyLayerSelector;
