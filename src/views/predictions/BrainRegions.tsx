import React from 'react';
import { useHistory } from 'react-router-dom';

import BrainRegionsSelector, {
  BrainRegion,
} from '../../components/BrainRegionsSelector';
import useQuery from '../../hooks/useQuery';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import Filters from '../../layouts/Filters';
import { primaryColor } from './config';
import Pills from '../../components/Pills';
import Selector from '../../components/Selector';

const BrainRegions: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const setBrainRegionQuery = (brainRegion: BrainRegion) => {
    history.push(`?brain_region=${brainRegion}`);
  };
  const currentRegion = query.get('brain_region') as BrainRegion;

  return (
    <Filters primaryColor={primaryColor} hasData={!!currentRegion}>
      <div className="center-col">
        <Title
          primaryColor={primaryColor}
          title="Brain Regions"
          subtitle="Predictions"
          hint="Select a subregion of interest in the S1 of the rat brain."
        />
        {!!currentRegion && (
          <div>
            <InfoBox title="Longer Text" text={lorem} color={primaryColor} />
            <br />
            <Pills
              title="1. Select a brain layer"
              list={['L1', 'L23', 'L4', 'L5', 'L6']}
              defaultValue="L23"
              onSelect={() => undefined}
              color={primaryColor}
            />
          </div>
        )}
      </div>
      <div className="center-col">
        <Selector title="Choose a subregion">
          <BrainRegionsSelector
            color={primaryColor}
            defaultActiveBrainRegion={currentRegion}
            onBrainRegionSelected={setBrainRegionQuery}
          />
        </Selector>
      </div>
    </Filters>
  );
};

export default BrainRegions;
