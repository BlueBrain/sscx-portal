import React from 'react';
import { useHistory } from 'react-router';

import Filters from '../layouts/Filters';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import { lorem } from '../views/Styleguide';
import Selector from '../components/Selector';
import MicrocircuitSelector from '../components/MicrocircuitSelector';
import useQuery from '../hooks/useQuery';
import { Layer, Color } from '../types';
import Pills from '../components/Pills';
import { BrainRegion } from '../components/BrainRegionsSelector';
import { accentColors } from '../config';


export type MicrocircuitTemplateProps = {
  color: Color;
  sectionTitle: string;
  children?: (subregion: string, layerNums: number[]) => React.ReactNode;
};

const Microcircuit: React.FC<MicrocircuitTemplateProps> = ({
  color,
  sectionTitle,
  children,
}) => {
  const query = useQuery();
  const history = useHistory();

  const addParam = (key: string, value: string): void => {
    query.set(key, value);
    history.push(`?${query.toString()}`);
  };

  const currentRegion: BrainRegion = query.get('brain_region') as BrainRegion;
  const currentLayer: Layer = query.get('layer') as Layer;

  const setRegion = (region: BrainRegion) => addParam('brain_region', region);
  const setLayer = (layer: Layer) => addParam('layer', layer);

  const layerNums = currentLayer
    ? currentLayer
      .replace('L', '')
      .split('')
      .map(numStr => parseInt(numStr))
    : [];

  return (
    <>
      <Filters
        primaryColor={color}
        backgroundAlt
        hasData={!!currentLayer && !!currentRegion}
      >
        <div className="center-col">
          <Title
            primaryColor={color}
            title="Microcircuit"
            subtitle={sectionTitle}
            hint="Select a microcircuit of interest."
          />
          <div>
            <InfoBox title="Longer Text" text={lorem} />
            <br />
            <Pills
              title="1. Select a subregion"
              list={['S1DZ', 'S1DZO', 'S1FL', 'S1HL', 'S1J', 'S1Sh', 'S1Tr', 'S1ULp']}
              defaultValue={currentRegion}
              onSelect={setRegion}
              color={color}
            />
          </div>
        </div>
        <div className="center-col">
          <Selector title="2. Choose a layer" column>
            <MicrocircuitSelector
              color={accentColors[color]}
              defaultActiveLayer={currentLayer}
              onLayerSelected={setLayer}
              disabled={!currentRegion}
            />
          </Selector>
        </div>
      </Filters>

      {children(currentRegion, layerNums)}
    </>
  );
};

export default Microcircuit;
