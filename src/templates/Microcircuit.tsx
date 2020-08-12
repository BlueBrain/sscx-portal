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
import HttpData from '../components/HttpData';
import Pills from '../components/Pills';
import { BrainRegion } from '../components/BrainRegionsSelector';
import { accentColors } from '../config';
import ScrollTo from '../components/ScrollTo';


export type MicrocircuitTemplateProps = {
  color: Color;
  sectionTitle: string;
  factsheetPath: (subregion: string, layerNum: number) => string;
  children: (data: any, title: string) => React.ReactNode;
};

const Microcircuits: React.FC<MicrocircuitTemplateProps> = ({
  color,
  sectionTitle,
  factsheetPath,
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

  const getLayerNums = () => {
    if (!currentLayer) return [];

    return currentLayer
      .replace('L', '')
      .split('')
      .map(numStr => parseInt(numStr));
  };

  const currentFactsheets = (currentRegion && currentLayer)
    ? getLayerNums().map(layerNum => ({
      path: factsheetPath(currentRegion, layerNum),
      title: `Layer L${layerNum} factsheet`,
    }))
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
              list={['S1FL', 'S1Sh', 'S1HL', 'S1Tr']}
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

      {currentFactsheets.map(factsheet => (
        <HttpData
          key={factsheet.path}
          path={factsheet.path}
        >
          {data => children(data, factsheet.title)}
        </HttpData>
      ))}

      <div className="scroll-to">
        <ScrollTo anchor="filters" direction="up">
          Return to filters
        </ScrollTo>
      </div>
    </>
  );
};

export default Microcircuits;
