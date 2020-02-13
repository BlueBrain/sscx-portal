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
import Selector from '../../components/Selector';
import { colorName } from '../extrapolation/config';

const BrainRegions: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const setBrainRegionQuery = (brainRegion: BrainRegion) => {
    history.push(`?brain_region=${brainRegion}`);
  };
  const currentRegion = query.get('brain_region') as BrainRegion;

  return (
    <Filters primaryColor={colorName} hasData={!!currentRegion}>
      <div className="center-col">
        <Title
          primaryColor={primaryColor}
          title="Brain Regions"
          subtitle="Predictions"
          hint="Select a subregion of interest in the S1 of the rat brain."
        />
        {!!currentRegion && (
          <div>
            <InfoBox title="Longer Text" text={lorem} color={colorName} />
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
