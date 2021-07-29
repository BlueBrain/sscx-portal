import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import chunk from 'lodash/chunk';
import { Row, Col } from 'antd';

import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Filters from '../layouts/Filters';
import Pills from '../components/Pills';
import { Layer, Color, Subregion } from '../types';

import SynapticPathwaySelector from '../components/SynapticPathwaySelector';
import List from '../components/List';
import { pathwayIndexPath } from '../queries/http';

import selectorStyle from '../styles/selector.module.scss';


export type SynapticPathwaysTemplateProps = {
  color: Color;
  sectionTitle: string;
  children?: (subregion: Subregion, pathway: string) => React.ReactNode;
};

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
  const query = router.query;

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

  const currentRegion: Subregion = query.brain_region as Subregion;
  const currentPreLayer: Layer = query.prelayer as Layer;
  const currentPostLayer: Layer = query.postlayer as Layer;
  const currentPreType: string = query.pretype as string;
  const currentPostType: string = query.posttype as string;

  const setRegion = (region: Subregion) => {
    setParams({
      'brain_region': region,
      prelayer: null,
      postlayer: null,
      pretype: null,
      posttype: null,
    });
  };

  const setPreLayerQuery = (layer: Layer) => {
    setParams({
      prelayer: layer,
      postlayer: null,
      pretype: null,
      posttype: null,
    });
  };

  const setPostLayerQuery = (layer: Layer) => {
    setParams({
      postlayer: layer,
      posttype: null,
    });
  };

  const setPreTypeQuery = (layer: Layer) => {
    setParams({
      pretype: layer,
      posttype: null,
    });
  };


  const setPostTypeQuery = (layer: Layer) => {
    setParams({
      posttype: layer,
    });
  };

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
      .map(([, postMtypeIdx]) => pathwayIndex.mtypeIdx[postMtypeIdx])
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
      .then(pathwayIndex => setPathwayIndex(pathwayIndex));
  }, []);

  return (
    <>
      <Filters primaryColor={color} hasData={!!hasData}>
        <Row
          className="w-100"
          align="bottom"
          gutter={[0, 20]}
        >
          <Col
            xs={24}
            xl={8}
            xxl={12}
          >
            <Title
              primaryColor={color}
              title="Synaptic Pathways"
              subtitle={sectionTitle}
            />
            <div>
              <InfoBox>
                <p>
                  A synaptic pathway encompasses the set of all possible connections between pairs of neurons
                  of pre and postsynaptic  morphological types (m-types).
                </p>
              </InfoBox>
            </div>
          </Col>

          <Col
            className={`set-accent-color--${color} mt-2`}
            xs={24}
            xl={16}
            xxl={12}
          >
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>1. Choose a subregion</div>
                <div className={selectorStyle.body} style={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
                  <Pills
                    list={['S1DZ', 'S1DZO', 'S1FL', 'S1HL', 'S1J', 'S1Sh', 'S1Tr', 'S1ULp']}
                    defaultValue={currentRegion}
                    onSelect={setRegion as (s: Subregion) => void}
                    color={color}
                  />
                </div>
              </div>
            </div>
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>2. Select a pre- and postsynaptic layers</div>
                <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '2rem 4rem' }}>
                  <SynapticPathwaySelector
                    color={color}
                    maxWidth="14rem"
                    preLayer={currentPreLayer}
                    onPreLayerSelect={setPreLayerQuery}
                    postLayer={currentPostLayer}
                    onPostLayerSelect={setPostLayerQuery}
                  />
                </div>
              </div>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>3. Choose pathway M-types</div>
                <div className={selectorStyle.body}>
                  <div className={selectorStyle.topFrameComponent}>
                    <List
                      title="m-type pre-synaptic"
                      block
                      color={color}
                      list={preMTypes}
                      value={currentPreType}
                      onSelect={setPreTypeQuery as (s: string) => void}
                    />
                  </div>
                  <div className={selectorStyle.bottomFrameComponent}>
                    <List
                      title="m-type post-synaptic"
                      block
                      color="orange"
                      list={postMTypes}
                      value={currentPostType}
                      onSelect={setPostTypeQuery as (s: string) => void}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Filters>

      {!!children && children(currentRegion, pathway as string)}
    </>
  );
};

export default SynapticPathways;
