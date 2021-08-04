import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import chunk from 'lodash/chunk';
import { Row, Col } from 'antd';

import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Filters from '../layouts/Filters';
import Pills from '../components/Pills';
import { Layer, Color, Subregion } from '../types';

import LayerSelector from '../components/MicrocircuitLayerSelector';
import List from '../components/List';
import { pathwayIndexPath } from '../queries/http';

import selectorStyle from '../styles/selector.module.scss';
import { StickyContainer } from '../components/StickyContainer';


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
          gutter={[0, 20]}
        >
          <Col
            xs={24}
            xl={8}
            xxl={10}
          >
            <StickyContainer>
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
            </StickyContainer>
          </Col>

          <Col
            className={`set-accent-color--${color} mt-2 mb-2`}
            xs={24}
            xl={16}
            xxl={14}
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
            <div className={`${selectorStyle.head} ${selectorStyle.fullHeader}`}>2. Select a prelayers and M-types</div>
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '1rem 4rem' }}>
                  <LayerSelector
                    color={color}
                    maxWidth="11rem"
                    value={currentPreLayer}
                    onSelect={setPreLayerQuery}
                  />
                </div>
              </div>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.body}>
                  <div className={selectorStyle.frame}>
                    <List
                      block
                      color={color}
                      list={preMTypes}
                      onSelect={setPreTypeQuery as (s: string) => void}
                      size="large"
                      title="m-type pre-synaptic"
                      value={currentPreType}
                    />
                  </div>
                </div>
              </div>

            </div>
            <div className={`${selectorStyle.head} ${selectorStyle.fullHeader}`}>3. Select a postsynaptic layers and M-types</div>
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '1rem 4rem' }}>
                  <LayerSelector
                    color="orange"
                    disabled={!currentPreLayer || !currentPreType}
                    maxWidth="11rem"
                    onSelect={setPostLayerQuery}
                    value={currentPostLayer}
                  />
                </div>
              </div>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.body}>
                  <div className={selectorStyle.frame}>
                    <List
                      block
                      color="orange"
                      disabled={!currentPreType}
                      list={postMTypes}
                      onSelect={setPostTypeQuery as (s: string) => void}
                      size="large"
                      title="m-type post-synaptic"
                      value={currentPostType}
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
