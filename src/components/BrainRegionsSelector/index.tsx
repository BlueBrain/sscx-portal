import React from 'react';

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

  return (<svg
      id="layer_anatomy_svg__Layer_1"
      x={0}
      y={0}
      viewBox="0 0 382.3 393.9"
      xmlSpace="preserve">
      <style>
        {
          '.layer_anatomy_svg__st3{fill:#050a30}.layer_anatomy_svg__st4{fill:#52617d}.layer_anatomy_svg__st5{fill:#303354;stroke:#fff;stroke-width:1.6671;stroke-miterlimit:10}.layer_anatomy_svg__st6{fill:none}.layer_anatomy_svg__st7{enable-background:new}.layer_anatomy_svg__st8{fill:#fff}.layer_anatomy_svg__st9{fill:#ffc807}.layer_anatomy_svg__st10{fill:none;stroke:#fff;stroke-width:1.6671;stroke-miterlimit:10}'
        }
      </style>
      <path
        id="layer_anatomy_svg__Shadow"
        d="M343.5 390.1H8.2c-2.2 0-4-1.8-4-4l5-14.2c0-2.2 1.8-4 4-4h325.4c2.2 0 4 1.8 4 4l5 14.2c-.1 2.3-1.9 4-4.1 4z"
        opacity={0.2}
        fill="#0b0780"
      />
      <g id="layer_anatomy_svg__Background_1_">
        <path
          d="M347.8 341.4L48.6 356.1c-8.5 0-27.2-7.8-27.8-30.2V17.8c0-8.5 7-13.8 15.5-13.8h299.4c22.1-.3 40.3 13 40.3 21.7l-12.7 300.4c0 8.3-7 15.3-15.5 15.3z"
          fill="#b2b3b3"
        />
        <linearGradient
          id="layer_anatomy_svg__SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1={339.805}
          y1={562.193}
          x2={-279.872}
          y2={1199.638}
          gradientTransform="translate(0 -512.11)"
        >
          <stop offset={0} stopColor="#fff" />
          <stop offset={0.1} stopColor="#fffefa" />
          <stop offset={0.226} stopColor="#fffaea" />
          <stop offset={0.366} stopColor="#fff5d0" />
          <stop offset={0.515} stopColor="#ffedac" />
          <stop offset={0.673} stopColor="#ffe27e" />
          <stop offset={0.836} stopColor="#ffd646" />
          <stop offset={0.999} stopColor="#ffc807" />
        </linearGradient>
        <path
          d="M363.5 357.3H51.9c-8.5 0-15.5-7-15.5-15.5V30.2c0-8.5 7-15.5 15.5-15.5h311.6c8.5 0 15.5 7 15.5 15.5v311.6c0 8.5-7 15.5-15.5 15.5z"
          fill="url(#layer_anatomy_svg__SVGID_1_)"
        />
        <g id="layer_anatomy_svg__Background">
          <path
            className="layer_anatomy_svg__st3"
            d="M337.2 88.9c-8.7-10.3-6.2-9.8-13.5-21.5-105.4-46.7-197.6-27.6-197.6-27.6l5.2 30.7c78.4-3 135 18 191.7 45.8 3.3-6.4 7-22.8 14.2-27.4zM121.3 271.2l7.7 48.5s47.3-32.3 108-18.5c.5.5-1.5 1.2-3-11.7-32.9-11.8-70.9-19.6-112.7-18.3zM122.1 215.7l5.5 46c49.2-.8 89.9-18.2 129.9-3 .5.5-2.3-4.5-11.2-19.5-68.5-26.3-124.2-23.5-124.2-23.5zM121.6 162l7.7 46.2c60.3 2.7 101.5-23.8 151.7-1.7.5 0-2-.5-16.5-22.2-79.7-31.9-142.9-22.3-142.9-22.3z"
          />
          <path
            className="layer_anatomy_svg__st3"
            d="M121.6 80.5l10.5 70.5c75-.3 125.9-42.8 185-17.7 1.5 0 2.5 1.2-16.8-25.8-97.7-42.3-178.7-27-178.7-27z"
          />
          <path
            className="layer_anatomy_svg__st4"
            d="M139.8 51.7l-13.2-9.8c-.5.5-.5-1.3-.5-.8l5.7 31.8 13.2 9.5-5.2-30.7zM135.6 92.4l-13.8-10c-.5.5-.5-1.3-.5-.8l11 71 13.8 10.5-10.5-70.7zM135.6 173.9l-13.2-12.3c-.5.5-.5.8-.5 1.3l7 45.3 14.2 11.7-7.5-46zM135.6 227.7l-14.2-12.3c-.5.5 7 50 7 50l13.5 9.5-6.3-47.2zM135.1 283.1l-13.8-12.5c-.5.5-.7.8-.5 1.7l8.2 47.3 13.8 12.3-7.7-48.8z"
          />
          <path
            className="layer_anatomy_svg__st5"
            d="M324.7 119.9C276 96 216.8 79.7 147.1 82c-1.2 0-2.3-.8-2.5-2l-4.5-26.2c0-1.3.8-2.5 2.3-2.7 15.2-2 99.9-10.5 195.2 37.2l-12.9 31.6zM242.5 292.1c-28.3-10.5-61.3-17.7-98.4-17.2-1.3 0-2.5-.7-2.5-2l-5.7-42.3c-.2-1.7.8-2.7 2.5-2.7 12.2.5 60.7 4.5 119.4 30.8l-15.3 33.4zM262.5 250.1c-34.3-15.7-73.9-27.7-117.2-29.8-1.2 0-2-.8-2.3-2l-6.8-41.7c-.5-1.3.5-2.7 2-2.7 13-.7 72.4-1.5 144.9 33l-20.6 43.2z"
          />
          <path
            id="layer_anatomy_svg__L23fill_1_"
            className="layer_anatomy_svg__st5"
            d="M319.2 131.7c-89.9-46-166.5-41-181.2-39.5-1.3 0-2.3 1.3-2 2.5l9.8 66c0 1.2 1.2 2 2.3 2 53.7.2 101 13.5 141.2 32 10-21 20-42 29.9-63"
          />
          <path
            id="layer_anatomy_svg__L6fill_1_"
            className="layer_anatomy_svg__st5"
            d="M137.6 283.1c-1.2 0-2.3 1.2-2 2.7l6.8 43.5c.2 1.3 1.3 2 2.5 2 8.3-.8 38.5-3 76.2 6.5 5.7-12.3 11.3-24.8 17.2-37.2-28.8-11-62.5-18.4-100.7-17.5z"
          />
        </g>
      </g>
      <g id="layer_anatomy_svg__fill">
        <path
          id="layer_anatomy_svg__L1fill"
          className="layer_anatomy_svg__st6"
          d="M142.4 51.2c-1.3.2-2.3 1.3-2.3 2.7l4.5 26.2c.2 1.2 1.3 2 2.5 2 69.7-2.3 128.9 14 177.5 37.8 4.8-10.3 9.5-20.7 14.2-31C243 40.7 157.6 49.2 142.4 51.2z"
        />
        <path
          id="layer_anatomy_svg__L23fill"
          className="layer_anatomy_svg__st6"
          d="M319.2 131.7c-89.9-46-166.5-41-181.2-39.5-1.3 0-2.3 1.3-2 2.5l9.8 66c0 1.2 1.2 2 2.3 2 53.7.2 101 13.5 141.2 32 10-21 20-42 29.9-63"
        />
        <path
          id="layer_anatomy_svg__L4fill"
          className="layer_anatomy_svg__st6"
          d="M138.3 173.9c-1.7 0-2.5 1.3-2 2.7l6.8 41.7c.2 1.2 1.2 2 2.3 2 43.3 2.2 82.9 14 117.2 29.8 6.8-14.3 13.8-28.7 20.8-43-72.6-34.9-132.1-34.1-145.1-33.2z"
        />
        <path
          id="layer_anatomy_svg__L5fill"
          className="layer_anatomy_svg__st6"
          d="M138.4 227.7c-1.7 0-2.7 1.2-2.5 2.7l5.7 42.3c0 1.3 1.2 2 2.5 2 35.5-.3 67.2 6.2 94.7 16 2 .7 4.2-.2 5-2 4.2-8.7 8.3-17.3 12.5-26.2 1-2 0-4.5-2-5.5-57-24.9-104-28.8-115.9-29.3z"
        />
        <path
          id="layer_anatomy_svg__L6fill"
          className="layer_anatomy_svg__st6"
          d="M137.6 283.1c-1.2 0-2.3 1.2-2 2.7l6.8 43.5c.2 1.3 1.3 2 2.5 2 8.3-.8 38.5-3 76.2 6.5 5.7-12.3 11.3-24.8 17.2-37.2-28.8-11-62.5-18.4-100.7-17.5z"
        />
      </g>
      <g id="layer_anatomy_svg__linesandtext">
        <g className="layer_anatomy_svg__st7">
          <path
            className="layer_anatomy_svg__st8"
            d="M239 68.5v10.7h6c.5 0 .8.2 1.2.3.3.2.3.5.3.8s-.2.7-.3.8c-.3.2-.7.3-1.2.3h-7.2c-.7 0-1.2-.2-1.3-.5-.2-.3-.5-.8-.5-1.3V68.4c0-.7.2-1 .3-1.3.3-.3.7-.5 1-.5.5 0 .8.2 1.2.5.3.4.5.8.5 1.4zM252.6 80.2V71c-1.7 1.3-2.8 2-3.3 2-.3 0-.5-.2-.7-.3-.2-.2-.3-.5-.3-.8 0-.3.2-.7.3-.7.2-.2.7-.3 1.2-.7.8-.3 1.5-.8 2-1.2l1.3-1.3c.5-.5.7-.8.7-1 .2-.2.3-.2.7-.2.3 0 .7.2.8.3s.3.7.3 1.2v11.5c0 1.3-.5 2-1.3 2-.3 0-.7-.2-1-.3-.5-.3-.7-.8-.7-1.3z"
          />
        </g>
        <g className="layer_anatomy_svg__st7">
          <path
            className="layer_anatomy_svg__st8"
            d="M213.1 127.9v10.7h6c.5 0 .8.2 1.2.3.3.2.3.5.3.8 0 .3-.2.7-.3.8-.3.2-.7.3-1.2.3H212c-.7 0-1.2-.2-1.3-.5-.2-.3-.5-.8-.5-1.3v-11.3c0-.7.2-1 .3-1.3.3-.3.7-.5 1-.5.5 0 .8.2 1.2.5.4.5.4 1 .4 1.5zM225.6 138.7h5.2c.5 0 .8.2 1.2.3.3.2.3.5.3.8 0 .3-.2.7-.3.8-.2.2-.5.3-1 .3h-7.3c-.5 0-.8-.2-1.2-.3-.3-.3-.5-.7-.5-1 0-.2.2-.5.3-1 .2-.5.3-.7.7-1 .8-1 1.7-1.7 2.3-2.3.7-.7 1.2-1.2 1.5-1.3.5-.3 1-.8 1.3-1.2.3-.3.7-.8.8-1.2.2-.3.3-.8.3-1.2 0-.5-.2-.8-.3-1.2-.2-.3-.5-.7-.8-.8-.3-.2-.7-.3-1.2-.3-.8 0-1.5.3-2 1.2 0 .2-.2.3-.3.8-.2.5-.3.8-.5 1s-.5.3-.8.3c-.3 0-.7-.2-.8-.3-.2-.2-.3-.5-.3-.8 0-.5.2-1 .3-1.5.2-.5.5-1 1-1.3.3-.3 1-.7 1.5-1 .5-.3 1.3-.3 2.2-.3 1 0 1.8.2 2.7.5.5.2.8.5 1.2.8s.7.8.8 1.3c.2.5.3 1 .3 1.5 0 .8-.2 1.5-.7 2.3-.3.7-.8 1.2-1.3 1.7s-1.2 1-2.2 1.8c-1 .8-1.7 1.5-2 1.8 0 .3-.2.5-.4.8zM238.8 132.2c.7 0 1.2-.2 1.7-.5s.7-.8.7-1.5c0-.5-.2-1-.5-1.3-.3-.3-.8-.5-1.5-.5-.3 0-.7 0-1 .2-.3.2-.5.3-.7.5-.2.2-.3.5-.5.7-.2.3-.3.5-.3.8 0 .2-.2.2-.3.3-.2 0-.3.2-.7.2-.3 0-.5-.2-.7-.3-.2-.2-.3-.5-.3-.8 0-.3.2-.7.3-1.2.2-.3.5-.7 1-1.2.3-.3.8-.7 1.5-.8.7-.2 1.3-.3 2-.3s1.2.2 1.8.3c.5.2 1 .5 1.3.8.3.3.7.7.8 1.2s.3.8.3 1.5-.2 1.2-.5 1.7-.7 1-1.2 1.3c.5.3 1 .7 1.3 1 .3.3.7.8.8 1.2.2.5.3.8.3 1.3 0 .7-.2 1.2-.3 1.8-.2.5-.7 1-1 1.5-.5.5-1 .8-1.7 1-.7.2-1.3.3-2.2.3-.8 0-1.5-.2-2.2-.5-.7-.3-1.2-.7-1.5-1-.3-.5-.7-.8-1-1.3-.2-.5-.3-.8-.3-1.2 0-.3.2-.7.3-1 .2-.2.5-.3 1-.3.2 0 .3 0 .5.2s.3.2.3.3c.3 1 .7 1.7 1.2 2 .3.5 1 .7 1.7.7.3 0 .8-.2 1.2-.3.3-.2.7-.5 1-.8.2-.3.3-.8.3-1.3 0-.8-.2-1.3-.7-1.8-.5-.5-1-.7-1.8-.7H238c-.3 0-.7-.2-.8-.3-.2-.2-.3-.5-.3-.8s.2-.5.3-.8c.2-.3.7-.3 1-.3h.3z"
          />
        </g>
        <g className="layer_anatomy_svg__st7">
          <path
            className="layer_anatomy_svg__st8"
            d="M201.5 199.6l.2 10.7h6c.5 0 .8.2 1.2.3.3.2.3.5.3.8s-.2.7-.3.8c-.3.2-.7.3-1.2.3h-7.2c-.7 0-1.2-.2-1.3-.3-.2-.2-.5-.7-.5-1.3l-.2-11.3c0-.7.2-1 .3-1.3.3-.3.7-.5 1-.5.5 0 .8.2 1.2.5.3.3.5.6.5 1.3zM216.6 211.2v-1.8h-5c-.7 0-1.2-.2-1.5-.3-.3-.3-.5-.7-.5-1.2v-.3c0-.2.2-.3.2-.3.2-.2.2-.3.3-.5.2-.2.2-.3.3-.5l5.2-7.2c.3-.5.7-.8.8-1s.5-.3.8-.3c1 0 1.5.5 1.5 1.7l.2 7.7h.5c.5 0 1 0 1.2.2.3.2.5.5.5.8 0 .3-.2.7-.3.8-.3.2-.7.3-1.2.3h-.6v1.8c0 .5-.2.8-.3 1.2-.2.3-.5.3-.8.3s-.7-.2-.8-.3c-.5-.2-.5-.6-.5-1.1zm-4.3-4h4.3v-5.8l-4.3 5.8z"
          />
        </g>
        <g className="layer_anatomy_svg__st7">
          <path
            className="layer_anatomy_svg__st8"
            d="M187 253.2l-.2 10.7h6c.5 0 .8.2 1.2.3.3.2.3.5.3.8s-.2.7-.3.8c-.3.2-.7.3-1.2.3h-7.2c-.7 0-1.2-.2-1.3-.5-.2-.3-.3-.8-.3-1.3l.2-11.3c0-.7.2-1 .5-1.3.3-.3.7-.5 1-.5.5 0 .8.2 1 .5s.3 1 .3 1.5zM204.3 254.4h-4.8l-.7 3.2c1-.5 1.8-.7 2.7-.7.7 0 1.2.2 1.8.3.5.2 1 .5 1.5 1 .3.5.7 1 1 1.5.2.5.3 1.2.3 1.8 0 1-.2 1.8-.7 2.7-.5.8-1 1.3-1.8 1.8s-1.8.7-2.8.7c-1.2 0-2.2-.2-2.8-.7-.7-.5-1.3-1-1.5-1.5-.2-.5-.5-1-.5-1.5 0-.3.2-.5.3-.7.2-.2.5-.3.8-.3.5 0 1 .3 1.2 1 .3.7.7 1 1 1.3.5.3 1 .5 1.5.5s1-.2 1.3-.3c.3-.3.7-.7.8-1.2.2-.5.3-1 .3-1.7s-.2-1.2-.3-1.7c-.2-.5-.5-.8-.8-1-.3-.2-.8-.3-1.3-.3s-1 0-1.2.2c-.2.2-.7.3-1 .7-.5.3-.8.5-1.2.5s-.7-.2-.8-.3c-.3-.2-.3-.5-.3-.8 0 0 0-.3.2-.7l.8-4.8c.2-.5.3-1 .5-1.2.3-.3.7-.3 1.2-.3h5.3c1 0 1.5.3 1.5 1.2 0 .3-.2.7-.3.8-.4.3-.7.5-1.2.5z"
          />
        </g>
        <g className="layer_anatomy_svg__st7">
          <path
            className="layer_anatomy_svg__st8"
            d="M180.6 305.1l-.2 10.7 6 .2c.5 0 .8.2 1.2.3.3.2.3.5.3.8s-.2.7-.3.8c-.3.2-.7.3-1.2.3l-7.2-.2c-.7 0-1.2-.2-1.3-.5-.2-.3-.3-.8-.3-1.3l.2-11.3c0-.7.2-1 .5-1.3.3-.3.7-.5 1-.5.5 0 .8.2 1 .5.1.3.3.8.3 1.5zM192.1 310.4c.5-.5 1-1 1.5-1.2.5-.3 1.2-.3 1.8-.3.7 0 1.2.2 1.7.3s1 .7 1.3 1c.3.5.7 1 .8 1.5.2.7.3 1.2.3 1.8 0 1-.2 1.8-.7 2.5-.5.7-1 1.3-1.8 1.8s-1.7.7-2.7.7c-1.2 0-2-.3-2.8-.8-.8-.5-1.3-1.3-1.8-2.5-.3-1-.7-2.3-.5-4 0-1.3.2-2.3.5-3.3s.7-1.8 1.2-2.5 1.2-1.2 1.8-1.5c.7-.3 1.5-.5 2.3-.5.8 0 1.7.2 2.2.5.7.3 1.2.8 1.5 1.3.3.5.5 1 .5 1.5 0 .3-.2.5-.3.7-.2.2-.5.3-.8.3s-.5-.2-.8-.3c-.2-.2-.3-.5-.5-.7-.2-.3-.3-.7-.7-1-.3-.2-.7-.3-1.2-.3-.3 0-.7.2-1 .3-.3.2-.7.5-.8.8-.6.9-1 2.1-1 3.9zm2.5 6.4c.7 0 1.2-.3 1.7-.8s.7-1.3.7-2.2c0-.7-.2-1.2-.3-1.5-.2-.5-.5-.8-.8-1-.3-.2-.8-.3-1.2-.3-.3 0-.8.2-1.2.3-.3.2-.7.5-1 1-.2.3-.3.8-.3 1.5 0 .8.2 1.7.7 2.3.4.3 1.1.5 1.7.7z"
          />
        </g>
        <g className="layer_anatomy_svg__st7">
          <path
            className="layer_anatomy_svg__st9"
            d="M333.7 324.6c0 1.7-.5 3.2-1.3 4.5-.8 1.3-2.2 2.3-3.8 3.2-1.7.8-3.7 1.2-5.8 1.2-2.7 0-5-.5-6.7-1.5-1.2-.7-2.3-1.7-3-3-.8-1.2-1.2-2.5-1.2-3.7 0-.7.2-1.3.7-1.7.5-.5 1-.7 1.8-.7.7 0 1 .2 1.5.5.3.3.8 1 1 1.7.3.8.7 1.7 1.2 2.2.3.7 1 1 1.7 1.5.7.3 1.7.5 2.8.5 1.7 0 3-.3 4-1.2s1.5-1.7 1.5-2.8c0-.8-.3-1.7-.8-2.2-.5-.5-1.3-1-2.2-1.3-.8-.3-2-.7-3.5-1-2-.5-3.7-1-5-1.7-1.3-.7-2.3-1.5-3.2-2.5-.8-1-1.2-2.3-1.2-4 0-1.5.3-2.8 1.2-4 .8-1.2 2-2 3.5-2.7 1.5-.7 3.3-1 5.5-1 1.7 0 3.2.2 4.3.7 1.2.5 2.2 1 3 1.7.8.7 1.3 1.5 1.8 2.2.5.7.5 1.5.5 2.2 0 .7-.2 1.3-.7 1.8-.5.5-1 .8-1.7.8s-1.2-.2-1.5-.5c-.3-.3-.7-.8-1-1.5-.5-1-1.2-1.8-1.8-2.5-.7-.5-1.8-.8-3.3-.8-1.5 0-2.7.3-3.5 1-.8.7-1.3 1.3-1.3 2.3 0 .5.2 1 .5 1.5s.7.7 1.2 1c.5.3 1 .5 1.7.7.5.2 1.5.3 2.7.7 1.5.3 3 .8 4.2 1.2 1.3.5 2.3 1 3.2 1.7s1.5 1.3 2 2.3c.6.5 1 1.7 1 3.2zM346.2 330.3v-17.2c-3.2 2.5-5.3 3.7-6.3 3.7-.5 0-1-.2-1.3-.7-.3-.5-.7-.8-.7-1.5s.2-1.2.7-1.3c.3-.3 1.2-.7 2.2-1.2 1.5-.7 2.7-1.5 3.7-2.2.8-.8 1.7-1.7 2.3-2.7.7-1 1.2-1.5 1.3-1.8.2-.2.7-.3 1.2-.3.7 0 1.2.3 1.7.8.3.5.7 1.2.7 2.2v21.5c0 2.5-.8 3.8-2.5 3.8-.8 0-1.3-.3-1.8-.8-1.1-.7-1.2-1.3-1.2-2.3z"
          />
        </g>
        <path
          className="layer_anatomy_svg__st10"
          d="M325.8 115.9c-.8 2.2-3.3 3-5.5 2-47.8-22.7-105.7-38-173.2-35.8-1.2 0-2.3-.8-2.5-2l-4.5-26.2c0-1.3.8-2.5 2.3-2.7 15-2 97.9-10.3 191.7 35.5 2 1 2.8 3.3 2 5.2l-10.3 24zM236.6 304.6c.8-2.2-.2-4.7-2.3-5.3-28-10.3-60.3-16.8-96.7-16-1.2 0-2.3 1.2-2 2.7l6.8 43.5c.2 1.3 1.3 2 2.5 2 8.2-.8 37.5-2.8 74.2 6 2 .5 4-.5 4.7-2.3l12.8-30.6zM242 291.9c-28.3-10.5-61-17.3-97.7-17-1.3 0-2.5-.7-2.5-2l-5.7-42.3c-.2-1.7.8-2.7 2.5-2.7 12.2.5 61 4.5 119.9 31.2L242 291.9zM264.6 246.6c-1 2-3.3 2.8-5.3 2-33.5-15-72-26.2-114-28.3-1.2 0-2-.8-2.3-2l-6.8-41.7c-.5-1.3.5-2.7 2-2.7 12.8-.7 70.5-1.5 141.4 31.3 2 1 2.8 3.3 2 5.5l-17 35.9z"
        />
        <path
          className="layer_anatomy_svg__st10"
          d="M292.5 191.7c-.8 2-3.3 3-5.3 2-39.7-18-86.4-30.8-139-31-1.2 0-2.3-.8-2.3-2l-9.8-66c-.2-1.2.7-2.5 2-2.5 14.3-1.5 89.2-6.3 177.4 37.5 2 1 2.8 3.3 1.8 5.3l-24.8 56.7z"
        />
      </g>
    </svg>
  );
};

export default BrainRegionSelector;
