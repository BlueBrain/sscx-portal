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
import { defaultSelection } from '../constants';


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

  const [pathwayIndex, setPathwayIndex] = useState<PathwayIndex>(null);

  const { brain_region, prelayer, postlayer, pretype, posttype } = router.query;

  const currentRegion: Subregion = brain_region as Subregion;
  const currentPreLayer: Layer = prelayer as Layer;
  const currentPostLayer: Layer = postlayer as Layer;
  const currentPreType: string = pretype as string;
  const currentPostType: string = posttype as string;

  const setParams = (params: Record<string, string>): void => {
    const query = { ...router.query, ...params };
    router.push({ query }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!router.query.brain_region && router.isReady) {
      const query = defaultSelection.digitalReconstruction.synapticPathways;
      router.replace({ query }, undefined, { shallow: true });
    }
  }, [router.query]);

  const setRegion = (region: Subregion) => {
    setParams({
      'brain_region': region,
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
                    A synaptic pathway encompasses the set of all possible connections between pairs of
                    neurons of pre and postsynaptic  morphological types (m-types). <br/>
                    We generate synaptic connectivity on an anatomically detailed level, i.e. we are
                    modelling the exact locations of individual synapses along the axon of the presynaptic
                    and on the dendritic tree of the postsynaptic neuron. Each individual synapse is
                    equipped with its own set of physiological parameters. Parameterization of these models
                    is done on a per-pathway basis, that means for pairs of a given combination of pre- and
                    postsynaptic neuron type.
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
                <div className={selectorStyle.head}>1. Select a subregion</div>
                <div className={selectorStyle.body} style={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
                  <Pills
                    list={['S1DZ', 'S1DZO', 'S1FL', 'S1HL', 'S1J', 'S1Sh', 'S1Tr', 'S1ULp']}
                    value={currentRegion}
                    onSelect={setRegion as (s: Subregion) => void}
                    color={color}
                  />
                </div>
              </div>
            </div>
            <div className={`${selectorStyle.head} ${selectorStyle.fullHeader}`}>2. Select a pre-synaptic layer and M-type</div>
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '1rem 4rem' }}>
                  <LayerSelector
                    color={color}
                    size="small"
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
                      title="M-type pre-synaptic"
                      value={currentPreType}
                    />
                  </div>
                </div>
              </div>

            </div>
            <div className={`${selectorStyle.head} ${selectorStyle.fullHeader}`}>3. Select a post-synaptic layer and M-type</div>
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '1rem 4rem' }}>
                  <LayerSelector
                    color="orange"
                    disabled={!currentPreLayer || !currentPreType}
                    onSelect={setPostLayerQuery}
                    value={currentPostLayer}
                    size="small"
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
                      title="M-type post-synaptic"
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
