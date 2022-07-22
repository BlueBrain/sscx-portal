import React from 'react';

import BrainRegionTemplate from '@/templates/BrainRegions';
import DataContainer from '@/components/DataContainer'
import Collapsible from '@/components/Collapsible';
import Video, { composeSources } from '@/components/VideoPlayer';
import { colorName, sectionTitle } from './config';


const BrainRegionsView = () => (
  <BrainRegionTemplate color={colorName} sectionTitle={sectionTitle}>
    {(subregion) => (
      <DataContainer
        visible={!!subregion}
        navItems={[
          { id: 'subregionSection', label: 'Subregion' },
        ]}
      >
        <Collapsible id="subregionSection" title={`${subregion} Subregion`} >
          <Video
            key={subregion}
            sources={composeSources(`/predictions/brain-regions/region_${subregion}_explosion`)}
            muted
            defaultSize={720}
            poster={null}
          />
        </Collapsible>
      </DataContainer>
    )}
  </BrainRegionTemplate>
);


export default BrainRegionsView;
