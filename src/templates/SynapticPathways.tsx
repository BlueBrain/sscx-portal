import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import { lorem } from '../views/Styleguide';
import Filters from '../layouts/Filters';
import Pills from '../components/Pills';
import useQuery from '../hooks/useQuery';
import { Layer, Color } from '../types';
import { BrainRegion } from '../components/BrainRegionsSelector';
import ComboSelector from '../components/ComboSelector';
import SynapticPathwaySelector from '../components/SynapticPathwaySelector';
import List from '../components/List';
import { accentColors } from '../config';


export type SynapticPathwaysTemplateProps = {
  color: Color;
  sectionTitle: string;
  children?: (subregion: string, pathway: string) => React.ReactNode;
};

type PathwayMType = {
  pre: {
    [layer: string]: string[];
  };
  post: {
    [layer: string]: string[];
  };
}

const SynapticPathways: React.FC<SynapticPathwaysTemplateProps> = ({
  sectionTitle,
  color,
  children,
}) => {
  const query = useQuery();
  const history = useHistory();

  const addParam = (key: string, value: string): void => {
    query.set(key, value);
    history.push(`?${query.toString()}`);
  };

  const [pathwayMType, setPathwayMType] = useState<PathwayMType | null>(null);

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

  const hasData = currentPreLayer && currentPostLayer && currentPreType && currentPostType;

  // FIXME: pick pathway mtypes from L2, L23 and L3 when user selects L23
  const preMTypes = pathwayMType && currentPreLayer
    ? pathwayMType.pre[currentPreLayer]
    : [];

  const postMTypes = pathwayMType && currentPostLayer
    ? pathwayMType.post[currentPostLayer]
    : [];

  const pathway = currentPreType && currentPostType
    ? `${currentPreType}-${currentPostType}`
    : null;

  useEffect(() => {
    fetch('/data/pathway-mtype.json')
      .then(res => res.json())
      .then(pathwayMType => setPathwayMType(pathwayMType))
  }, []);

  return (
    <>
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
              list={['S1DZ', 'S1DZO', 'S1FL', 'S1HL', 'S1J', 'S1Sh', 'S1Tr', 'S1ULp']}
              defaultValue={currentRegion}
              onSelect={setRegion}
              color={color}
            />
          </div>
        </div>
        <div className="center-col">
          <ComboSelector
            selector={
              <SynapticPathwaySelector
                color={accentColors[color]}
                defaultActivePreLayer={currentPreLayer}
                onPreLayerSelected={setPreLayerQuery}
                defaultActivePostLayer={currentPostLayer}
                onPostLayerSelected={setPostLayerQuery}
              />
            }
            list1={
              <List
                title="m-type pre-synaptic"
                list={preMTypes}
                defaultValue={currentPreType}
                onSelect={setPreTypeQuery}
                color={color}
              />
            }
            list2={
              <List
                title="m-type post-synaptic"
                list={postMTypes}
                defaultValue={currentPostType}
                onSelect={setPostTypeQuery}
                color="orange"
              />
            }
            selectorTitle="2. Choose two layers"
            listsTitle="3. Choose Pre and Post-synaptic"
            list1Open={!!currentPreLayer}
            list2Open={!!currentPostLayer}
          />
        </div>
      </Filters>

      {children(currentRegion, pathway)}
    </>
  );
};

export default SynapticPathways;
