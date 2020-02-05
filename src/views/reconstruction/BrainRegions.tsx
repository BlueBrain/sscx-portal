import React from 'react';
import { useHistory } from 'react-router-dom';

import BrainRegionsSelector, {
  BrainRegion,
} from '../../components/BrainRegionsSelector';
import useQuery from '../../hooks/useQuery';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { dinos, lorem } from '../Styleguide';
import Filters from '../../layouts/Filters';
import { primaryColor } from './config';
import Pills from '../../components/Pills';

const BrainRegions: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const setBrainRegionQuery = (brainRegion: BrainRegion) => {
    history.push(`?brain_region=${brainRegion}`);
  };

  return (
    <Filters primaryColor={primaryColor}>
      <div className="center-col">
        <Title
          primaryColor={primaryColor}
          title="Brain Regions"
          subtitle="Reconstruction Data"
          hint="Select a subregion of interest in the S1 of the rat brain."
        />
        <div>
          <InfoBox title="Longer Text" text={lorem} color={primaryColor} />
          <br />
          <Pills
            title="1. Select a brain layer"
            list={['L1', 'L23', 'L4', 'L5', 'L6']}
            selected="L23"
            onSelect={() => undefined}
          />
        </div>
      </div>
      <div className="center-col">
        <BrainRegionsSelector
          defaultActiveBrainRegion={query.get('brain_region') as BrainRegion}
          onBrainRegionSelected={setBrainRegionQuery}
        />
      </div>
    </Filters>
  );
};

export default BrainRegions;
