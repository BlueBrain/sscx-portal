import React from 'react';
import { useHistory } from 'react-router-dom';

import useQuery from '../hooks/useQuery';
import BrainRegionsSelector, {
  BrainRegion,
} from '../components/BrainRegionsSelector';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Selector from '../components/Selector';
import HttpData from '../components/HttpData';
import ScrollTo from '../components/ScrollTo';
import { lorem } from '../views/Styleguide';
import Filters from '../layouts/Filters';
import { Color } from '../types';

export type BrainRegionTemplateProps = {
  color: Color;
  sectionTitle: string;
  factsheetPath?: (subregion: string) => string;
  children?: (subregion: string, data: any) => React.ReactNode;
};

const BrainRegions: React.FC<BrainRegionTemplateProps> = ({
  color,
  sectionTitle,
  factsheetPath = () => '',
  children,
}) => {
  const query = useQuery();
  const history = useHistory();

  const setBrainRegionQuery = (brainRegion: BrainRegion) => {
    history.push(`?brain_region=${brainRegion}`);
  };
  const currentRegion = query.get('brain_region') as BrainRegion;

  const currentFactsheetPath = currentRegion
    ? factsheetPath(currentRegion)
    : null;

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentRegion}>
        <div className="center-col">
          <Title
            primaryColor={color}
            title="Brain Regions"
            subtitle={sectionTitle}
            hint="Select a subregion of interest in the S1 of the rat brain."
          />
          {!!currentRegion && (
            <div>
              <InfoBox title="Longer Text" text={lorem} color={color} />
            </div>
          )}
        </div>
        <div className="center-col">
          <Selector title="Choose a subregion">
            <BrainRegionsSelector
              color={color}
              defaultActiveBrainRegion={currentRegion}
              onBrainRegionSelected={setBrainRegionQuery}
            />
          </Selector>
        </div>
      </Filters>

      <HttpData path={currentFactsheetPath}>{data => children(currentRegion, data)}</HttpData>

      <div className="scroll-to">
        <ScrollTo anchor="filters" direction="up">
          Return to filters
        </ScrollTo>
      </div>
    </>
  );
};

export default BrainRegions;
