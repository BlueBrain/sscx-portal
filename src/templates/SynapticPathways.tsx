import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import chunk from 'lodash/chunk';

import ServerSideContext from '../context/server-side-context';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Filters from '../layouts/Filters';
import Pills from '../components/Pills';
import { Layer, Color } from '../types';
import { BrainRegion } from '../components/BrainRegionsSelector';
import ComboSelector from '../components/ComboSelector';
import SynapticPathwaySelector from '../components/SynapticPathwaySelector';
import List from '../components/List';
import { accentColors } from '../config';
import { pathwayIndexPath } from '../queries/http';


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

type PathwayIndex = {
  region: {
    [brainRegion: string]: number[],
  },
  mtypeIdx: string[],
}


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


const SynapticPathways: React.FC<SynapticPathwaysTemplateProps> = ({
  sectionTitle,
  color,
  children,
}) => {
  const router = useRouter();
  const serverSideContext = useContext(ServerSideContext);

  const query = { ...serverSideContext?.query, ...router?.query };

  const setParams = (params: Record<string, string>): void => {
    const query = {
      ...{
        brain_region: currentRegion,
        prelayer: currentPreLayer,
        postlayer: currentPostLayer,
        pretype: currentPreType,
        posttype: currentPostType,
      },
      ...params,
    };
    router.push({ query, pathname: router.pathname }, undefined, { shallow: true });
  };

  const [pathwayIndex, setPathwayIndex] = useState<PathwayIndex>(null);

  const currentRegion: BrainRegion = query.brain_region as BrainRegion;
  const currentPreLayer: Layer = query.prelayer as Layer;
  const currentPostLayer: Layer = query.postlayer as Layer;
  const currentPreType: string = query.pretype as string;
  const currentPostType: string = query.posttype as string;

  const setRegion = (region: BrainRegion) => {
    setParams({
      'brain_region': region,
      prelayer: null,
      pretype: null,
      postlayer: null,
      posttype: null,
    });
  }

  const setPreLayerQuery = (layer: Layer) => {
    setParams({
      prelayer: layer,
      pretype: null,
      postlayer: null,
      posttype: null,
    });
  }

  const setPreTypeQuery = (layer: Layer) => {
    setParams({
      pretype: layer,
      postlayer: null,
      posttype: null,
    });
  }

  const setPostLayerQuery = (layer: Layer) => {
    setParams({
      postlayer: layer,
      posttype: null,
    });
  }

  const setPostTypeQuery = (layer: Layer) => {
    setParams({
      posttype: layer,
    });
  }

  const hasData = currentPreType && currentPostType;

  const preMTypes = pathwayIndex && currentRegion && currentPreLayer
    ? chunk(pathwayIndex.region[currentRegion], 2)
      .map(([preMtypeIdx]) => pathwayIndex.mtypeIdx[preMtypeIdx])
      .filter(onlyUnique)
      .filter(mtype => mtype.match(currentPreLayer === 'L23' ? 'L23|L2|L3' : currentPreLayer))
      .sort()
    : [];

  const postMTypes = pathwayIndex && currentRegion && currentPreType && currentPostLayer
    ? chunk(pathwayIndex.region[currentRegion], 2)
        .filter(([preMtypeIdx]) => pathwayIndex.mtypeIdx[preMtypeIdx] === currentPreType)
        .map(([,postMtypeIdx]) => pathwayIndex.mtypeIdx[postMtypeIdx])
        .filter(onlyUnique)
        .filter(mtype => mtype.match(currentPostLayer === 'L23' ? 'L23|L2|L3' : currentPostLayer))
        .sort()
    : [];

  const pathway = currentPreType && currentPostType
    ? `${currentPreType}-${currentPostType}`
    : null;

  useEffect(() => {
    fetch(pathwayIndexPath)
      .then(res => res.json())
      .then(pathwayIndex => setPathwayIndex(pathwayIndex))
  }, []);

  return (
    <>
      <Filters primaryColor={color} hasData={!!hasData}>
        <div className="center-col">
          <Title
            primaryColor={color}
            title="Synaptic Pathways"
            subtitle={sectionTitle}
          />
          <div>
            <InfoBox>
              <p>A synaptic pathway encompasses the set of all possible connections between pairs of neurons of pre and postsynaptic  morphological types (m-types).</p>
            </InfoBox>
            <Pills
              className="mt-3"
              title="1. Select a subregion"
              list={['S1DZ', 'S1DZO', 'S1FL', 'S1HL', 'S1J', 'S1Sh', 'S1Tr', 'S1ULp']}
              defaultValue={currentRegion}
              onSelect={setRegion as (s: string) => void}
              color={color}
            />
          </div>
        </div>
        <div className="center-col">
          <ComboSelector
            selector={
              <SynapticPathwaySelector
                color={accentColors[color]}
                preLayer={currentPreLayer}
                onPreLayerSelected={setPreLayerQuery}
                postLayer={currentPostLayer}
                onPostLayerSelected={setPostLayerQuery}
              />
            }
            list1={
              <List
                title="m-type pre-synaptic"
                list={preMTypes}
                value={currentPreType}
                onSelect={setPreTypeQuery as (s: string) => void}
                color={color}
              />
            }
            list2={
              <List
                title="m-type post-synaptic"
                list={postMTypes}
                value={currentPostType}
                onSelect={setPostTypeQuery as (s: string) => void}
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

      {!!children && children(currentRegion, pathway as string)}
    </>
  );
};

export default SynapticPathways;
