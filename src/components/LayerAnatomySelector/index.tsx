import React from 'react';

import LayerAnatomySVG from './layer_anatomy.svg';
import './layer_anatomy.css';

const classPrefix = 'layer_anatomy_svg__';
const layers: Layer[] = ['L1', 'L23', 'L4', 'L5', 'L6'];

type Layer = 'L1' | 'L23' | 'L4' | 'L5' | 'L6';

type LayerAnatomySelectProps = {
  defaultActiveLayer?: Layer;
  onLayerSelected?: (layer: Layer) => void;
};

const LayerAnatomySelector: React.FC<LayerAnatomySelectProps> = ({
  defaultActiveLayer,
  onLayerSelected,
}) => {
  const [activeLayer, setActiveLayer] = React.useState<Layer>(
    defaultActiveLayer,
  );
  const svg = React.useRef<SVGElement>();

  React.useEffect(() => {
    // make default layer active
    const d =
      activeLayer &&
      svg.current &&
      svg.current.querySelector(`#${classPrefix}${activeLayer}fill`);
    d && d.classList.add('active');

    // add event listeners for all Layers
    layers.map(layer => {
      const layerEl = svg.current.querySelector(`#${classPrefix}${layer}fill`);
      layerEl &&
        layerEl.addEventListener('click', () => {
          const current = svg.current.querySelector(
            `#${classPrefix}${activeLayer}fill`,
          );
          // toggle active layer on click
          current && current.classList.remove('active');
          layerEl.classList.add('active');
          // callback prop
          onLayerSelected(layer);
          // set new active layer
          setActiveLayer(layer);
        });
    });
    return () => {
      // remove old event listeners by clone layers nodes
      layers.map(layer => {
        const layerEl = svg.current.querySelector(
          `#${classPrefix}${layer}fill`,
        );
        if (layerEl) {
          const newLayerEl = layerEl.cloneNode(true);
          layerEl.parentNode.replaceChild(newLayerEl, layerEl);
        }
      });
    };
  }, [activeLayer]);

  return <LayerAnatomySVG ref={svg} />;
};

export default LayerAnatomySelector;
