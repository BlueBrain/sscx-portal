import React from 'react';
import { useHistory } from 'react-router';

import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import { lorem } from '../views/Styleguide';
import Filters from '../layouts/Filters';
import Pills from '../components/Pills';
import useQuery from '../hooks/useQuery';
import { Layer, Color } from '../types';
import SynapticTypesSelector from '../components/SynapticTypesSelector';
import { BrainRegion } from '../components/BrainRegionsSelector';

const mTypes = ['a', 'b', 'c', 'd', 'e', 'f'];

export type SynapticPathwaysTemplateProps = {
  color: Color;
  sectionTitle: string;
};

const BrainRegions: React.FC<SynapticPathwaysTemplateProps> = ({
  sectionTitle,
  color,
}) => {
  const query = useQuery();
  const history = useHistory();

  const addParam = (key: string, value: string): void => {
    query.set(key, value);
    history.push(`?${query.toString()}`);
  };

  const currentRegion: BrainRegion = query.get('brain_region') as BrainRegion;
  const currentPreLayer: Layer = query.get('prelayer') as Layer;
  const currentPostLayer: Layer = query.get('postlayer') as Layer;
  const currentPreType: string = query.get('pretype');
  const currentPostType: string = query.get('posttype');

  const setRegion = (region: BrainRegion) => addParam('brain_region', region);
  const setPreLayerQuery = (layer: Layer) => addParam('prelayer', layer);
  const setPostLayerQuery = (layer: Layer) => addParam('postlayer', layer);
  const setPreTypeQuery = (layer: Layer) => addParam('pretype', layer);
  const setPostTypeQuery = (layer: Layer) => addParam('posttype', layer);

  const hasData =
    currentPreLayer && currentPostLayer && currentPreType && currentPostType;

  return (
    <Filters primaryColor={color} hasData={!!hasData}>
      <div className="center-col">
        <Title
          primaryColor={color}
          title="Synaptic Pathways"
          subtitle={sectionTitle}
          hint="Select a subregion of interest in the S1 of the rat brain."
        />
        <div>
          <InfoBox title="Longer Text" text={lorem} color={color} />
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
        <SynapticTypesSelector
          color={color}
          defaultActivePreLayer={currentPreLayer}
          onPreLayerSelected={setPreLayerQuery}
          defaultActivePostLayer={currentPostLayer}
          onPostLayerSelected={setPostLayerQuery}
          synapticTypes={mTypes}
          synapticTypesName="Pre and post-synaptio"
          onPostTypeSelect={setPostTypeQuery}
          onPreTypeSelect={setPreTypeQuery}
          selectedPreType={currentPreType}
          selectedPostType={currentPostType}
        />
      </div>
    </Filters>
  );
};

export default BrainRegions;
