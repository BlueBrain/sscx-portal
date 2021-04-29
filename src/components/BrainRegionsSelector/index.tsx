import React, { ReactChild, ReactFragment } from 'react';
import { accentColors } from '../../config';

// import './style.scss';

const classPrefix = 'brain-regions-svg__';

export type BrainRegion = 'S1DZ' | 'S1DZO' | 'S1FL' | 'S1HL' | 'S1J' | 'S1Sh' | 'S1Tr' | 'S1ULp';

type BrainRegionProps = {
  region: BrainRegion;
  onSelect: (region: BrainRegion) => void;
  activeRegion?: BrainRegion;
  children: ReactChild | ReactFragment;
};

type BrainRegionsSelectProps = {
  defaultActiveBrainRegion?: BrainRegion;
  onBrainRegionSelected?: (brainRegion: BrainRegion) => void;
  color: string;
};

const Region: React.FC<BrainRegionProps> = ({
  region,
  activeRegion,
  onSelect,
  children,
}) => (
  <g
    role="radio"
    aria-checked={activeRegion === region}
    tabIndex={0}
    className={`${classPrefix}region`}
    onClick={() => onSelect(region)}
  >
    {children}
  </g>
);

const BrainRegionSelector: React.FC<BrainRegionsSelectProps> = ({
  defaultActiveBrainRegion,
  onBrainRegionSelected,
  color,
}) => {
  const [activeRegion, setActiveRegion] = React.useState<BrainRegion>(
    defaultActiveBrainRegion as BrainRegion,
  );

  const selectRegion = (r: BrainRegion): void => {
    setActiveRegion(r);
    onBrainRegionSelected && onBrainRegionSelected(r);
  };

  const colorHex = accentColors[color];

  return (
    <svg
      id={`${classPrefix}layer-1`}
      x={0}
      y={0}
      viewBox="0 0 382.3 393.8"
      xmlSpace="preserve"
    >
      <path
        id={`${classPrefix}shadow`}
        d="M342.6 390.8H5.9c-2.2 0-4-1.8-4-4l3.3-15c0-2.2 1.8-4 4-4H339c2.2 0 4 1.8 4 4l3.3 15c.3 2.2-1.6 4-3.7 4z"
        opacity={0.2}
        fill="#0b0780"
      />
      <g id={`${classPrefix}background`}>
        <g id={`${classPrefix}background-back`}>
          <path
            d="M346.2 340.5L48.7 356.3c-8.7 0-30.8-15.8-31.3-31.5V16.5c0-8.7 7-14 15.7-14h305c20.2-1 36.8 11.7 36.8 20.3l-12.8 302c-.2 8.7-7.2 15.7-15.9 15.7z"
            fill="#b2b3b3"
          />
          <linearGradient
            id={`${classPrefix}background-gradient`}
            gradientUnits="userSpaceOnUse"
            x1={338.207}
            y1={559.46}
            x2={-284.989}
            y2={1200.525}
            gradientTransform="translate(0 -512.11)"
          >
            <stop offset={0} stopColor="#fff" />
            <stop offset={0.999} stopColor={colorHex} />
          </linearGradient>
          <path
            d="M362.1 356.3H48.7c-8.7 0-15.7-7-15.7-15.7V27.3c0-8.7 7-15.7 15.7-15.7H362c8.7 0 15.7 7 15.7 15.7v313.3c0 8.7-7 15.7-15.6 15.7z"
            fill={`url(#${classPrefix}background-gradient)`}
          />
          <path
            d="M230.4 79.5V80.4c0 2.3-.2 4.8-.5 7.2-.2 2.2-.3 4.2-.5 6.3 0 0 0 .3-.2.8-2 19.2-6.3 36.5-16 33-.3 0-.8-.2-1.2-.5-.8-.3-1.7-.8-2.5-1.3-1.3-.7-2.5-1.3-3.3-1.8s-1.5-.8-1.5-.8c-3.3-2.2-6.3-4.5-8.8-6.8-2.5-2.5-4.5-5-6.2-7.7-3-5-4.2-10.5-4.2-16.8v-1.3c0-.5 0-1.2.2-1.8v-1c0-.7.2-1.3.2-1.8v-.7c0-.7.2-1 .2-1 1.8-12.8 7-33.3 10.7-46.8 3.2-11.8 18.7-15 26-5.2.8 1.2 1.7 2.3 2.3 3.5v.2c.6 1.5 4 22.4 5.3 43.4zM140.1 114.3l-.2.8c-1.2 4.8-8 31.7-15 52.3-5.2 15.5-10.3 49-13.2 75.7-.2 2.3-.3 4.5-.7 6.7-.8 9.5-1.3 17.8-1.3 23.7 0 4.7-1.8 7.7-5 9.7h-.2c-5.7 3.5-15 3.3-23.3 2-2.3-.3-4.7-1-6.7-2-7.8-3.5-13.8-10.7-15-19.3-5-34.5 10.7-73.2 23.5-92.5 15.4-22.9 57.1-57.1 57.1-57.1z"
            fill="#050a30"
          />
          <path
            d="M171.9 321.3c-81.7 10.2-99.5-39.5-99.5-39.5l2.5 1.2c2.2 1 4.3 1.7 6.7 2 8.3 1.3 17.7 1.5 23.3-2l35.2 5.5c.5.8 8.5 23.3 26.7 30.8.3.3 4.9 2 5.1 2z"
            fill="#050a30"
          />
          <path
            className={`${classPrefix}background-left-part`}
            d="M195.9 116.1c-1.8-.8-3.5-1.5-5.2-1.8-5.5-1.3-9.8.3-12.3 6.5-.3.7-.3 1.3-.2 2.2 1.8 8.5 13.8 68.8-.2 89.8-7.5 11.3-19 26.7-27.5 40.8-.8 1.7-1.8 3.2-2.7 4.7H144c-5-.2-9.8-.8-14.7-2h-.2c-1.2-.3-2.5-.7-3.7-1l-7.2-2.5-7.2-2.8c.2-1.7.3-3.5.5-5.3.8-7.7 1.8-16 3-24.3.3-2.3.7-4.7 1-7 2-13.3 4.3-26.2 6.7-36 .2-1 .5-2 .8-3 .7-2.5 1.2-4.7 1.8-6.7 6.8-20.7 13.7-47.5 15-52.3l.2-.8s15.8-40 46.2-30.3c0 0 0 .3-.2 1 0 .8-.2 2.2-.3 3.5-.2.7-.2 1.3-.2 1.8v1.3c0 6.3 1.3 11.8 4.2 16.8 1.7 2.4 3.7 4.9 6.2 7.4z"
          />
          <path
            d="M328.9 170.3c-15.2-60.7-56.8-120.2-96.7-132-.8-1.2-1.5-2.3-2.3-3.5-7.3-9.8-22.8-6.7-26 5.2-3.7 13.5-8.8 34.2-10.7 46.8-30.3-9.5-46.2 30.3-46.2 30.3l-.2.8c-4 3.3-42.2 35-56.5 56.5-13 19.3-28.5 58-23.5 92.5 1.2 8 6.2 14.5 13 18.3l-.5-.2s17.7 49.2 99.5 39c5.7 2 12.7 3.7 21.2 5 43 7.2 52.2-6 53-20.2 7.7 2.3 20 5.2 30.5 4 0 .3 45.3 23.8 45.3 1.2.1-22.4 15.3-83 .1-143.7zM194.2 117h-.7.7zm1.7 0h-.8.8zm-3-26.2v0zm-.3 26.3c-.2 0-.5.2-.7.2.2-.2.5-.2.7-.2zm-1.5.4c-.3.2-.5.3-.7.3.2 0 .3-.2.7-.3zm-1.5.6c-.2.2-.3.3-.7.5.3-.1.5-.3.7-.5zm-1.2 1c-.2.2-.3.5-.5.7.2-.2.3-.3.5-.7zm-1.2 1.4c-.2.2-.3.5-.5.8.2-.2.4-.5.5-.8zm-1 1.6c-.8 1.5-1 3.3-.7 5 0 .3.2.5.2.8 0-.3-.2-.7-.2-.8-.4-1.6-.1-3.5.7-5zm-31.5 139.2h-.8c-9.5 0-18.8-1.8-27.7-5.3l-7.8-3.2 7 2.8 7.2 2.5c1.2.3 2.5.7 3.7 1h.2c4.8 1.2 9.7 1.8 14.7 2l3.5.2zm-4.5 36.8c1 2 2.3 4.3 4 6.7.5.8 1 1.5 1.5 2.2 1.2 1.7 2.5 3.3 4.2 5 .5.5 1 1.2 1.7 1.7-5.5-5.1-9.2-11.1-11.4-15.6zm12.5 17c.7.7 1.3 1.2 2 1.7-.6-.5-1.3-1-2-1.7zm2.2 2c.5.5 1.2.8 1.7 1.3-.7-.4-1.2-.9-1.7-1.3zm6.2 4c.8.5 1.8.8 2.8 1.3 0 0 .2.2.5.2-.2-.2-.5-.2-.5-.2-1-.3-2-.8-2.8-1.3zm-2.4-1.1c.3.2.5.3.8.5-.3-.4-.4-.4-.8-.5zm10 4.3zm7.5-110.5c-.3.7-.8 1.3-1.2 2 .4-.7.9-1.3 1.2-2zm5.5-29.7v-2.3 2.3zm-5.3 29.4c.3-.7.7-1.2.8-1.8-.1.6-.5 1.1-.8 1.8zm1.3-3c.2-.3.3-.8.5-1.2-.1.3-.3.7-.5 1.2zm1-2.9c.2-.3.2-.7.3-1-.1.4-.1.7-.3 1zm.7-2.5c.2-.3.2-.7.3-1.2-.1.4-.1.7-.3 1.2zm.7-2.6c.2-.5.2-1 .3-1.5-.2.6-.3 1.1-.3 1.5zm.5-3.4c0-.3.2-.7.2-1-.1.4-.1.7-.2 1zm.5-3c0-.3.2-.8.2-1.2-.2.6-.2.9-.2 1.2zm.5-6.6v-.8.8zm.1-2.4v-1.8 1.8zm-6-58.8c.2.8.3 1.8.5 2.8-.1-1-.3-2-.5-2.8zm.7 3.2c.2 1 .3 2.2.7 3.3-.4-1.2-.5-2.3-.7-3.3zm.7 4.1c0 .3.2.7.2.8-.1-.3-.2-.6-.2-.8zm.5 2.4c0 .5.2 1 .3 1.5-.2-.5-.3-1-.3-1.5zm.3 2.5c0 .3.2.8.2 1.3 0-.5-.2-1-.2-1.3zm.5 2.6c0 .2 0 .5.2.7-.2-.3-.2-.5-.2-.7zm.3 2.7c0 .2 0 .5.2.7 0-.2-.2-.4-.2-.7zm.5 3c0 .5.2 1 .2 1.5-.2-.5-.2-1-.2-1.5zm.4 3c0 .5.2 1 .2 1.3-.1-.3-.2-.8-.2-1.3zm.3 3.2c0 .5.2 1 .2 1.5 0-.5 0-1-.2-1.5zm.5 3.1c0 .5.2.8.2 1.3-.2-.3-.2-.8-.2-1.3zm.8 10.2v0zm.2 3.3v0zm.2 3.5v0zm.1 3.4v0zm23-50.7c.2.2.5.3.7.3-.2-.1-.5-.3-.7-.3z"
            fill="#303354"
          />
        </g>
      </g>
      <g id="brain_regions_svg__group" role="radiogroup">
        <Region
          region="S1Tr"
          onSelect={selectRegion}
          activeRegion={activeRegion}
        >
          <path
            className={`${color} ${classPrefix}shape${
              activeRegion === 'S1Tr' ? '--active' : ''
            }`}
            d="M178.9 324.5c-81.7 10.2-99.5-39-99.5-39l2.3.7c2.2 1 4.3 1.7 6.7 2 8.3 1.3 17.7 1.5 23.3-2l35.2 5.5c.5.8 8.5 23.3 26.7 30.8.5.1 5.1 2 5.3 2z"
          />
          <path
            className={`${classPrefix}name`}
            d="M121.2 306.8c0 .7-.2 1.2-.5 1.8-.3.5-.8 1-1.5 1.2s-1.3.5-2.3.5c-1 0-2-.2-2.7-.7-.5-.3-.8-.7-1.2-1.2-.3-.5-.5-1-.5-1.3 0-.3.2-.5.3-.7.2-.2.3-.3.7-.3.2 0 .5 0 .5.2.2.2.3.3.3.7.2.3.3.7.5.8.2.2.3.5.7.5.3.2.7.2 1.2.2.7 0 1.2-.2 1.5-.5.3-.3.7-.7.7-1.2 0-.3-.2-.7-.3-.8-.2-.2-.5-.3-.8-.5-.3-.2-.8-.2-1.3-.3-.8-.2-1.5-.3-2-.7-.5-.2-1-.5-1.2-1-.3-.5-.5-1-.5-1.5 0-.7.2-1.2.5-1.5.3-.3.8-.8 1.3-1 .7-.2 1.3-.3 2.2-.3.7 0 1.2 0 1.7.2s.8.3 1.2.7c.3.3.5.5.7.8.2.3.2.7.2.8 0 .3-.2.5-.3.7-.2.2-.3.3-.7.3-.2 0-.5 0-.5-.2-.2-.2-.3-.3-.5-.7-.2-.3-.5-.7-.7-1-.3-.2-.7-.3-1.3-.3-.5 0-1 .2-1.3.3-.3.2-.5.5-.5.8 0 .2 0 .3.2.5s.3.3.5.3.3.2.7.3c.3.2.5.2 1 .3.7.2 1.2.3 1.7.5s.8.3 1.3.7c.3.2.7.5.8 1 .1.6.2.9.2 1.6zM126.2 309v-6.7c-1.2 1-2 1.5-2.5 1.5-.2 0-.3 0-.5-.2s-.2-.3-.2-.5 0-.5.2-.5.5-.3.8-.5c.7-.3 1-.5 1.5-.8l1-1c.3-.3.5-.7.5-.7s.2-.2.5-.2.5.2.7.3.2.5.2.8v8.3c0 1-.3 1.5-1 1.5-.3 0-.5-.2-.7-.3-.1 0-.5-.7-.5-1zM138.9 301h-2.3v7.8c0 .5-.2.8-.3 1-.2.2-.5.3-.8.3s-.7-.2-.8-.3c-.2-.2-.3-.5-.3-1V301h-2.2c-.3 0-.7 0-.8-.2-.2-.2-.3-.3-.3-.7 0-.3.2-.5.3-.7.2-.2.5-.2.8-.2h6.8c.3 0 .7 0 .8.2.2.2.3.3.3.7 0 .3-.2.5-.3.7-.2.2-.4.2-.9.2zM142.7 307.3v1.7c0 .3-.2.7-.3.8-.2.2-.5.3-.7.3-.3 0-.5-.2-.7-.3s-.3-.5-.3-.8v-5.5c0-.8.3-1.3 1-1.3.3 0 .5.2.7.3.2.2.2.5.2 1 .2-.3.5-.7.7-1 .3-.2.7-.3 1-.3.3 0 .8.2 1.2.3.3.2.7.5.7.8 0 .2-.2.5-.3.7-.2.2-.3.2-.5.2 0 0-.3 0-.5-.2-.3-.2-.5-.2-.7-.2-.3 0-.5 0-.7.2-.2.2-.3.3-.5.7-.2.3-.2.7-.2 1-.1.4-.1.9-.1 1.6z"
          />
        </Region>
        <Region
          region="S1FL"
          onSelect={selectRegion}
          activeRegion={activeRegion}
        >
          <path
            className={`${color} ${classPrefix}shape${
              activeRegion === 'S1FL' ? '--active' : ''
            }`}
            d="M237.4 82.6V83.5c0 2.3-.2 4.8-.5 7.2-.2 2.2-.3 4.2-.5 6.3 0 0 0 .3-.2.8-2 19.2-6.3 36.5-16 33-.3 0-.8-.2-1.2-.5-.8-.3-1.7-.8-2.5-1.3-1.3-.7-2.5-1.3-3.3-1.8s-1.5-.8-1.5-.8c-3.3-2.2-6.3-4.5-8.8-6.8-2.5-2.5-4.5-5-6.2-7.7-3-5-4.2-10.5-4.2-16.8v-1.3c0-.5 0-1.2.2-1.8v-1c0-.7.2-1.3.2-1.8v-.7c0-.7.2-1 .2-1 1.8-12.8 7-33.3 10.7-46.8 3.2-11.8 18.7-15 26-5.2.8 1.2 1.7 2.3 2.3 3.5v.2c.6 1.4 4 22.3 5.3 43.4z"
          />
          <path
            className={`${color} ${classPrefix}shape${
              activeRegion === 'S1FL' ? '--active' : ''
            }`}
            d="M147.1,291.6l-35.2-5.5c3-1.8,5-5,5-9.7c0-5.8,0.5-14.2,1.3-23.7l8,3.2c8.8,3.5,18.2,5.3,27.7,5.3h0.8C147.9,273.8,143.7,284.8,147.1,291.6z"
          />
          <path
            className={`${classPrefix}name`}
            d="M205.9 91.1c0 .7-.2 1.2-.5 1.8-.3.5-.8 1-1.5 1.2-.7.2-1.3.5-2.3.5-1 0-2-.2-2.7-.7-.5-.3-.8-.7-1.2-1.2s-.5-1-.5-1.3c0-.3.2-.5.3-.7.2-.2.3-.3.7-.3.2 0 .5 0 .5.2.2.2.3.3.3.7.2.3.3.7.5.8.2.2.3.5.7.5.3.2.7.2 1.2.2.7 0 1.2-.2 1.5-.5.3-.3.7-.7.7-1.2 0-.3-.2-.7-.3-.8-.2-.2-.5-.3-.8-.5-.3-.2-.8-.2-1.3-.3-.8-.2-1.5-.3-2-.7-.5-.2-1-.5-1.2-1-.3-.5-.5-1-.5-1.5 0-.7.2-1.2.5-1.5.3-.3.8-.8 1.3-1 .7-.2 1.3-.3 2.2-.3.7 0 1.2 0 1.7.2s.8.3 1.2.7.5.5.7.8c.2.3.2.7.2.8 0 .3-.2.5-.3.7-.2.2-.3.3-.7.3-.2 0-.5 0-.5-.2-.2-.2-.3-.3-.5-.7-.2-.3-.5-.7-.7-1-.3-.2-.7-.3-1.3-.3-.5 0-1 .2-1.3.3-.3.2-.5.5-.5.8 0 .2 0 .3.2.5s.3.3.5.3.3.2.7.3c.2 0 .5.2 1 .3.7.2 1.2.3 1.7.5s.8.3 1.3.7c.3.2.7.5.8 1 .2.6.2 1.1.2 1.6zM210.9 93.3v-6.7c-1.2 1-2 1.5-2.5 1.5-.2 0-.3 0-.5-.2s-.2-.3-.2-.5 0-.5.2-.5.5-.3.8-.5c.7-.3 1-.5 1.5-.8l1-1c.3-.3.5-.7.5-.7.2-.2.2-.2.5-.2s.5.2.7.3.2.5.2.8v8.3c0 1-.3 1.5-1 1.5-.3 0-.5-.2-.7-.3-.5-.3-.5-.5-.5-1zM223.1 85.3h-4.3V88h3.5c.3 0 .5 0 .7.2.2.2.2.3.2.7 0 .3 0 .5-.2.7-.2.2-.3.2-.7.2h-3.5v3.5c0 .5-.2.8-.3 1-.2.2-.5.3-.8.3s-.7-.2-.8-.3c-.2-.2-.3-.5-.3-1V85c0-.3 0-.5.2-.8.2-.2.2-.3.5-.5.2-.2.5-.2.8-.2h5.2c.3 0 .7 0 .8.2.2.2.3.3.3.7 0 .3-.2.5-.3.7-.4 0-.5.2-1 .2zM227.9 84.8v7.8h4.3c.3 0 .7.2.8.3.2.2.3.3.3.7 0 .3-.2.5-.3.7-.2.2-.5.2-.8.2H227c-.5 0-.8-.2-1-.3-.2-.2-.3-.5-.3-1v-8.3c0-.5.2-.8.3-1 .2-.2.5-.3.8-.3s.7.2.8.3c.1.1.3.4.3.9z"
          />
        </Region>
        <Region
          region="S1Sh"
          onSelect={selectRegion}
          activeRegion={activeRegion}
        >
          <path
            className={`${color} ${classPrefix}shape${
              activeRegion === 'S1Sh' ? '--active' : ''
            }`}
            d="M202.9 119.1c-1.8-.8-3.5-1.5-5.2-1.8-5-1.2-9 0-11.5 4.8-.8 1.5-1 3.2-.7 5 2.3 11.8 13.2 68.5-.5 88.8-7.5 11.3-19 26.7-27.5 40.8-.8 1.7-1.8 3.2-2.7 4.7H151c-5-.2-9.8-.8-14.7-2h-.2c-1.2-.3-2.5-.7-3.7-1l-7.2-2.5-7.2-2.8c.2-1.7.3-3.5.5-5.3.8-7.7 1.8-16 3-24.3.3-2.3.7-4.7 1-7 2-13.3 4.3-26.2 6.7-36 .2-1 .5-2 .8-3 .7-2.5 1.2-4.7 1.8-6.7 6.8-20.7 13.7-47.5 15-52.3l.2-.8s15.8-40 46.2-30.3c0 0 0 .3-.2 1 0 .8-.2 2.2-.3 3.5-.2.7-.2 1.3-.2 1.8V95c0 6.3 1.3 11.8 4.2 16.8 1.7 2.5 3.7 5 6.2 7.3z"
          />
          <path
            className={`${classPrefix}name`}
            d="M150.1 190.1c0 .7-.2 1.2-.5 1.8-.3.5-.8 1-1.5 1.2s-1.3.5-2.3.5c-1 0-2-.2-2.7-.7-.5-.3-.8-.7-1.2-1.2-.3-.5-.5-1-.5-1.3 0-.3.2-.5.3-.7.2-.2.3-.3.7-.3.2 0 .5 0 .5.2.2.2.3.3.3.7.2.3.3.7.5.8s.3.5.7.5c.3.2.7.2 1.2.2.7 0 1.2-.2 1.5-.5.3-.3.7-.7.7-1.2 0-.3-.2-.7-.3-.8-.2-.2-.5-.3-.8-.5-.3-.2-.8-.2-1.3-.3-.8-.2-1.5-.3-2-.7-.5-.2-1-.5-1.2-1-.3-.5-.5-1-.5-1.5 0-.7.2-1.2.5-1.5.3-.3.8-.8 1.3-1 .7-.2 1.3-.3 2.2-.3.7 0 1.2 0 1.7.2s.8.3 1.2.7c.3.3.5.5.7.8.2.3.2.7.2.8 0 .3-.2.5-.3.7-.2.2-.3.3-.7.3-.2 0-.5 0-.5-.2-.2-.2-.3-.3-.5-.7-.2-.3-.5-.7-.7-1-.3-.2-.7-.3-1.3-.3-.5 0-1 .2-1.3.3s-.5.5-.5.8c0 .2 0 .3.2.5s.3.3.5.3.3.2.7.3.5.2 1 .3c.7.2 1.2.3 1.7.5s.8.3 1.3.7c.3.2.7.5.8 1 0 .6.2 1 .2 1.6zM154.9 192.3v-6.7c-1.2 1-2 1.5-2.5 1.5-.2 0-.3 0-.5-.2s-.2-.3-.2-.5 0-.5.2-.5.5-.3.8-.5c.7-.3 1-.5 1.5-.8l1-1c.3-.3.5-.7.5-.7s.2-.2.5-.2.5.2.7.3c.2.2.2.5.2.8v8.3c0 1-.3 1.5-1 1.5-.3 0-.5-.2-.7-.3s-.5-.7-.5-1zM168.9 190.1c0 .7-.2 1.2-.5 1.8-.3.5-.8 1-1.5 1.2-.7.2-1.3.5-2.3.5-1 0-2-.2-2.7-.7-.5-.3-.8-.7-1.2-1.2-.3-.5-.5-1-.5-1.3 0-.3.2-.5.3-.7.2-.2.3-.3.7-.3.2 0 .5 0 .5.2.2.2.3.3.3.7.2.3.3.7.5.8.2.2.3.5.7.5.3.2.7.2 1.2.2.7 0 1.2-.2 1.5-.5.3-.3.7-.7.7-1.2 0-.3-.2-.7-.3-.8-.2-.2-.5-.3-.8-.5-.3-.2-.8-.2-1.3-.3-.8-.2-1.5-.3-2-.7-.5-.2-1-.5-1.2-1-.3-.5-.5-1-.5-1.5 0-.7.2-1.2.5-1.5.3-.3.8-.8 1.3-1 .7-.2 1.3-.3 2.2-.3.7 0 1.2 0 1.7.2s.8.3 1.2.7c.3.3.5.5.7.8.2.3.2.7.2.8 0 .3-.2.5-.3.7-.2.2-.3.3-.7.3-.2 0-.5 0-.5-.2-.2-.2-.3-.3-.5-.7-.2-.3-.5-.7-.7-1-.3-.2-.7-.3-1.3-.3-.5 0-1 .2-1.3.3-.3.2-.5.5-.5.8 0 .2 0 .3.2.5s.3.3.5.3.3.2.7.3.5.2 1 .3c.7.2 1.2.3 1.7.5s.8.3 1.3.7c.3.2.7.5.8 1 .2.6.2 1 .2 1.6zM172.6 183.6v3l.7-.7c.2-.2.5-.3.8-.3.3-.2.7-.2 1-.2.5 0 1 .2 1.3.3.3.2.7.5 1 1 .2.2.2.5.3.8v4.8c0 .3-.2.7-.3.8s-.5.3-.7.3c-.7 0-1-.3-1-1.2v-3.3c0-.7-.2-1.2-.3-1.5-.2-.3-.5-.5-1.2-.5-.3 0-.7.2-1 .3-.3.2-.5.5-.7.8-.2.3-.2.8-.2 1.7v2.7c0 .3-.2.7-.3.8-.2.2-.5.3-.7.3-.7 0-1-.3-1-1.2V184c0-.3.2-.7.3-.8.2-.2.3-.3.7-.3s.5.2.7.3c.6-.4.6-.1.6.4z"
          />
        </Region>
        <Region
          region="S1HL"
          onSelect={selectRegion}
          activeRegion={activeRegion}
        >
          <path
            className={`${color} ${classPrefix}shape${
              activeRegion === 'S1HL' ? '--active' : ''
            }`}
            d="M147.2 117.8l-.2.8c-1.2 4.8-8 31.7-15 52.3-5.2 15.5-10.3 49-13.2 75.7-.2 2.3-.3 4.5-.7 6.7-.8 9.5-1.3 17.8-1.3 23.7 0 4.7-1.8 7.7-5 9.7h-.2c-5.7 3.5-15 3.3-23.3 2-2.3-.3-4.7-1-6.7-2-7.8-3.5-13.8-10.7-15-19.3-5-34.5 10.7-73.2 23.5-92.5 15.5-22.9 57.1-57.1 57.1-57.1z"
          />
          <path
            className={`${classPrefix}name`}
            d="M84.7 234.3c0 .7-.2 1.2-.5 1.8-.3.5-.8 1-1.5 1.2-.7.2-1.3.5-2.3.5s-2-.2-2.7-.7c-.5-.3-.8-.7-1.2-1.2-.3-.5-.5-1-.5-1.3 0-.3.2-.5.3-.7.2-.2.3-.3.7-.3.2 0 .5 0 .5.2.2.2.3.3.3.7.2.3.3.7.5.8.2.2.3.5.7.5.3.2.7.2 1.2.2.7 0 1.2-.2 1.5-.5.3-.3.7-.7.7-1.2 0-.3-.2-.7-.3-.8-.2-.2-.5-.3-.8-.5-.3-.2-.8-.2-1.3-.3-.8-.2-1.5-.3-2-.7-.5-.2-1-.5-1.2-1-.3-.5-.5-1-.5-1.5 0-.7.2-1.2.5-1.5s.8-.8 1.3-1c.7-.2 1.3-.3 2.2-.3.7 0 1.2 0 1.7.2s.8.3 1.2.7c.3.3.5.5.7.8.2.3.2.7.2.8 0 .3-.2.5-.3.7-.2.2-.3.3-.7.3-.2 0-.5 0-.5-.2-.2-.2-.3-.3-.5-.7-.2-.3-.5-.7-.7-1-.3-.2-.7-.3-1.3-.3-.5 0-1 .2-1.3.3-.3.2-.5.5-.5.8 0 .2 0 .3.2.5s.3.3.5.3.3.2.7.3c.3.2.5.2 1 .3.7.2 1.2.3 1.7.5s.8.3 1.3.7c.3.2.7.5.8 1 .1.6.2.9.2 1.6zM89.6 236.5v-6.7c-1.2 1-2 1.5-2.5 1.5-.2 0-.3 0-.5-.2s-.2-.3-.2-.5 0-.5.2-.5.5-.3.8-.5c.7-.3 1-.5 1.5-.8l1-1c.3-.3.5-.7.5-.7s.2-.2.5-.2.5.2.7.3.2.5.2.8v8.3c0 1-.3 1.5-1 1.5-.3 0-.5-.2-.7-.3-.2 0-.5-.7-.5-1zM97.6 227.8v3h4.7v-3c0-.5.2-.8.3-1 .2-.2.5-.3.8-.3.3 0 .7.2.8.3.2.2.3.5.3 1v8.5c0 .5-.2.8-.3 1-.2.2-.5.3-.8.3-.3 0-.7-.2-.8-.3-.2-.2-.3-.5-.3-1v-3.7h-4.7v3.7c0 .5-.2.8-.3 1-.2.2-.5.3-.8.3-.3 0-.7-.2-.8-.3-.2-.2-.3-.5-.3-1v-8.5c0-.5.2-.8.3-1 .2-.2.5-.3.8-.3.3 0 .7.2.8.3.3.3.3.7.3 1zM108.9 227.8v7.8h4.3c.3 0 .7.2.8.3.2.2.3.3.3.7 0 .3-.2.5-.3.7-.2.2-.5.2-.8.2h-5.3c-.5 0-.8-.2-1-.3-.2-.2-.3-.5-.3-1v-8.3c0-.5.2-.8.3-1 .2-.2.5-.3.8-.3.3 0 .7.2.8.3.4.2.4.6.4.9z"
          />
        </Region>
      </g>
      <g id={`${classPrefix}lines-and-text`}>
        <path
          className={`${classPrefix}outline`}
          d="M260.7 246.1c-7.5 22.7-7.5 45.5-7.5 60.7v2.5c-.8 14.2-10 27.5-53 20.2-8.5-1.5-15.5-3.2-21.2-5h-.2-.2c-.5-.2-.8-.2-1.2-.5-1.3-.5-3.3-1.3-3.5-1.3-2.2-1-4.3-2-6.2-3.3-2-1.5-3.8-3-5.5-4.5-.8-.8-1.7-1.7-2.3-2.5-1.5-1.7-2.8-3.3-4.2-5-.5-.7-1-1.5-1.5-2.2-4.5-6.8-6.7-12.8-7-13.3-3.3-6.7.8-17.8 7.7-30.3.8-1.5 1.7-3 2.7-4.7 8.7-14.2 20-29.3 27.5-40.8 13.5-20.3 2.8-77 .5-88.7-.3-1.7-.2-3.5.7-5 2.5-4.8 6.5-6 11.5-4.8 1.7.3 3.3 1 5.2 1.8 2.5 2.3 5.3 4.7 8.8 6.8 0 0 .7.3 1.5.8 1 .7 2.2 1.3 3.3 1.8.8.5 1.7 1 2.5 1.3 8.8 7.3 18.3 16.7 26.7 25 22.6 22.9 22.6 68.4 14.9 91z"
        />
        <path
          className={`${classPrefix}outline`}
          d="M237.4 82.6V83.5c0 2.3-.2 4.8-.5 7.2-.2 2.2-.3 4.2-.5 6.3 0 0 0 .3-.2.8-2 19.2-6.3 36.5-16 33-.3 0-.8-.2-1.2-.5-.8-.3-1.7-.8-2.5-1.3-1.3-.7-2.5-1.3-3.3-1.8s-1.5-.8-1.5-.8c-3.3-2.2-6.3-4.5-8.8-6.8-2.5-2.5-4.5-5-6.2-7.7-3-5-4.2-10.5-4.2-16.8v-1.3c0-.5 0-1.2.2-1.8v-1c0-.7.2-1.3.2-1.8v-.7c0-.7.2-1 .2-1 1.8-12.8 7-33.3 10.7-46.8 3.2-11.8 18.7-15 26-5.2.8 1.2 1.7 2.3 2.3 3.5v.2c.6 1.4 4 22.3 5.3 43.4zM178.9 324.5c-81.7 10.2-99.5-39-99.5-39l2.3.7c2.2 1 4.3 1.7 6.7 2 8.3 1.3 17.7 1.5 23.3-2l35.2 5.5c.5.8 8.5 23.3 26.7 30.8.5.1 5.1 2 5.3 2zM147.1 291.6l-35.2-5.5c3-1.8 5-5 5-9.7 0-5.8.5-14.2 1.3-23.7l8 3.2c8.8 3.5 18.2 5.3 27.7 5.3h.8c-6.8 12.6-11 23.6-7.6 30.4z"
        />
        <path
          className={`${classPrefix}outline`}
          d="M202.9 119.1c-1.8-.8-3.5-1.5-5.2-1.8-5-1.2-9 0-11.5 4.8-.8 1.5-1 3.2-.7 5 2.3 11.8 13.2 68.5-.5 88.8-7.5 11.3-19 26.7-27.5 40.8-.8 1.7-1.8 3.2-2.7 4.7H151c-5-.2-9.8-.8-14.7-2h-.2c-1.2-.3-2.5-.7-3.7-1l-7.2-2.5-7.2-2.8c.2-1.7.3-3.5.5-5.3.8-7.7 1.8-16 3-24.3.3-2.3.7-4.7 1-7 2-13.3 4.3-26.2 6.7-36 .2-1 .5-2 .8-3 .7-2.5 1.2-4.7 1.8-6.7 6.8-20.7 13.7-47.5 15-52.3l.2-.8s15.8-40 46.2-30.3c0 0 0 .3-.2 1 0 .8-.2 2.2-.3 3.5-.2.7-.2 1.3-.2 1.8V95c0 6.3 1.3 11.8 4.2 16.8 1.7 2.5 3.7 5 6.2 7.3zM328.9 314.3c0 22.7-45.3-.8-45.3-1.2 7.5-45 15-82.7 7.5-142.8-.5-3.8-1.2-7.5-1.8-10.8-9.3-40.2-39.7-57.2-52.7-62.7h-.2c.2-2.2.3-4.2.5-6.3.2-2.3.3-4.8.5-7.2v-.7c-1.3-21-4.7-41.8-5-44.2v-.2c39.8 12 81.5 71.5 96.7 132 15 60.8-.2 121.4-.2 144.1z"
        />
        <path
          className={`${classPrefix}outline`}
          d="M283.7 313.1c-10.7 1.2-22.8-1.7-30.5-4v-2.5c0-15.2 0-37.8 7.5-60.7 7.5-22.7 7.5-68.2-15.2-91-8.3-8.3-17.7-17.7-26.7-25 .3.2.8.3 1.2.5 9.7 3.5 14-13.8 16-33 0-.5.2-.8.2-.8h.2c13 5.5 43.3 22.5 52.7 62.7.8 3.3 1.5 7 1.8 10.8 7.7 60.4.3 98.2-7.2 143z"
        />
        <path
          className={`${classPrefix}outline`}
          d="M147.2 117.8l-.2.8c-1.2 4.8-8 31.7-15 52.3-5.2 15.5-10.3 49-13.2 75.7-.2 2.3-.3 4.5-.7 6.7-.8 9.5-1.3 17.8-1.3 23.7 0 4.7-1.8 7.7-5 9.7h-.2c-5.7 3.5-15 3.3-23.3 2-2.3-.3-4.7-1-6.7-2-7.8-3.5-13.8-10.7-15-19.3-5-34.5 10.7-73.2 23.5-92.5 15.5-22.9 57.1-57.1 57.1-57.1z"
        />
        <path
          className={`${classPrefix}S1`}
          fill={colorHex}
          d="M71.2 51c0 1.7-.5 3.2-1.3 4.5-.8 1.3-2.2 2.3-3.8 3.2s-3.7 1.2-5.8 1.2c-2.7 0-5-.5-6.7-1.5-1.2-.7-2.3-1.7-3-3-.8-1.2-1.2-2.5-1.2-3.7 0-.7.2-1.3.7-1.7.5-.5 1-.7 1.8-.7.7 0 1 .2 1.5.5.3.3.8 1 1 1.7.3.8.7 1.7 1.2 2.2.3.7 1 1 1.7 1.5s1.7.5 2.8.5c1.7 0 3-.3 4-1.2 1-.8 1.5-1.7 1.5-2.8 0-.8-.3-1.7-.8-2.2s-1.3-1-2.2-1.3-2-.7-3.5-1c-2-.5-3.7-1-5-1.7S51.7 44 50.9 43c-.8-1-1.2-2.3-1.2-4 0-1.5.3-2.8 1.2-4 .8-1.2 2-2 3.5-2.7 1.5-.7 3.3-1 5.5-1 1.7 0 3.2.2 4.3.7 1.2.5 2.2 1 3 1.7.8.7 1.3 1.5 1.8 2.2.5.7.5 1.5.5 2.2 0 .7-.2 1.3-.7 1.8s-1 .8-1.8.8c-.7 0-1.2-.2-1.5-.5-.3-.3-.7-.8-1-1.5-.5-1-1.2-1.8-1.8-2.5-.7-.5-1.8-.8-3.3-.8-1.5 0-2.7.3-3.5 1-.8.7-1.3 1.3-1.3 2.3 0 .5.2 1 .5 1.5s.7.7 1.2 1c.5.3 1 .5 1.7.7.5.2 1.5.3 2.7.7 1.5.3 3 .8 4.2 1.2 1.3.5 2.3 1 3.2 1.7.8.7 1.5 1.3 2 2.3 1 .7 1.1 1.8 1.1 3.2zM83.7 56.6v-17c-3.2 2.5-5.3 3.7-6.3 3.7-.5 0-1-.2-1.3-.7-.3-.5-.7-.8-.7-1.5s.2-1.2.7-1.3 1.2-.7 2.2-1.2c1.5-.7 2.7-1.5 3.7-2.2.8-.8 1.7-1.7 2.3-2.7s1.2-1.5 1.3-1.8c.2-.3.7-.3 1.2-.3.7 0 1.2.3 1.7.8s.7 1.2.7 2.2V56c0 2.5-.8 3.8-2.5 3.8-.8 0-1.3-.3-1.8-.8-.7-.5-1.2-1.4-1.2-2.4z"
        />
      </g>
    </svg>
  );
};

export default BrainRegionSelector;
