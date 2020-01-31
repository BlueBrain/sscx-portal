import React from 'react';
import { useHistory } from 'react-router-dom';

import BrainRegionsSelector, {
  BrainRegion,
} from '../../components/BrainRegionsSelector';
import useQuery from '../../hooks/useQuery';

const BrainRegions: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const setBrainRegionQuery = (brainRegion: BrainRegion) => {
    history.push(`?brain_region=${brainRegion}`);
  };

  return (
    <>
      <h1 role="title">Brain Regions</h1>
      <BrainRegionsSelector
        defaultActiveBrainRegion={query.get('brain_region') as BrainRegion}
        onBrainRegionSelected={setBrainRegionQuery}
      />
    </>
  );
};

export default BrainRegions;
