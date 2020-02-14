import React from 'react';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import { primaryColor, colorName } from './config';
import Selector from '../../components/Selector';
import MicrocircuitSelector from '../../components/MicrocircuitSelector';
import useQuery from '../../hooks/useQuery';
import { useHistory } from 'react-router';
import { Layer } from '../../types';
import Pills from '../../components/Pills';
import { BrainRegion } from 'src/components/BrainRegionsSelector';

const Microcircuits: React.FC = () => {
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

  return (
    <Filters
      primaryColor={colorName}
      backgroundAlt
      hasData={!!currentLayer && !!currentRegion}
    >
      <div className="center-col">
        <Title
          primaryColor={colorName}
          title="Microcircuits"
          subtitle="Predictions"
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
            color={colorName}
          />
        </div>
      </div>
      <div className="center-col">
        <Selector title="2. Choose a layer" column>
          <MicrocircuitSelector
            color={primaryColor}
            defaultActiveLayer={currentLayer}
            onLayerSelected={setLayer}
            disabled={!currentRegion}
          />
        </Selector>
      </div>
    </Filters>
  );
};

export default Microcircuits;
