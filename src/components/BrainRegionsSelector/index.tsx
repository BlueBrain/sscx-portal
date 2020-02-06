import React from 'react';

// import BrainRegionsSVG from './brain_regions.svg';
import './brain_regions.css';

const classPrefix = 'brain_regions_svg__';
const brainRegions: BrainRegion[] = ['S1FL', 'S1Sh', 'S1HL', 'S1Tr'];

export type BrainRegion = 'S1FL' | 'S1Sh' | 'S1HL' | 'S1Tr';
type BrainRegionSelectProps = {
  defaultActiveBrainRegion?: BrainRegion;
  onBrainRegionSelected?: (brainRegion: BrainRegion) => void;
};

const BrainRegionSelector: React.FC<BrainRegionSelectProps> = ({
  defaultActiveBrainRegion,
  onBrainRegionSelected,
}) => {
  /*const [activeRegion, setActiveRegion] = React.useState<BrainRegion>(
    defaultActiveBrainRegion,
  );
  const svg = React.useRef<SVGElement>();

  const brainRegionList = ['S1FL', 'S1Sh', 'S1HL', 'S1Tr'];

  // set eventListeners for selectable brain regions (.st5)
  React.useEffect(() => {
    // make default layer active
    const d =
      activeRegion &&
      svg.current &&
      svg.current.querySelector(`#${classPrefix}${activeRegion}fill`);
    d && d.classList.add('active');

    // add event listeners for all BrainRegions
    brainRegions.map(region => {
      const regionEl = svg.current.querySelector(
        `#${classPrefix}${region}fill`,
      );
      regionEl &&
        regionEl.addEventListener('click', () => {
          const current = svg.current.querySelector(
            `#${classPrefix}${activeRegion}fill`,
          );
          // toggle active layer on click
          current && current.classList.remove('active');
          regionEl.classList.add('active');
          // callback prop
          onBrainRegionSelected && onBrainRegionSelected(region);
          // set new active layer
          setActiveRegion(region);
        });
    });
    return () => {
      // remove old event listeners by clone layers nodes
      brainRegions.map(region => {
        const regionEl = svg.current.querySelector(
          `#${classPrefix}${region}fill`,
        );
        if (regionEl) {
          const newRegionEl = regionEl.cloneNode(true);
          regionEl.parentNode.replaceChild(newRegionEl, regionEl);
        }
      });
    };
  }, [activeRegion]);*/

  return <div>Brain regions</div>;
};

export default BrainRegionSelector;
