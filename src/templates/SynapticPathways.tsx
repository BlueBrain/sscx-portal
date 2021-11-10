import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import chunk from 'lodash/chunk';
import { Row, Col } from 'antd';

import { defaultSelection, subregions, layers } from '../constants';
import { Layer, Color, Subregion } from '../types';
import { pathwayIndexPath } from '../queries/http';
import Filters from '../layouts/Filters';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Pills from '../components/Pills';
import QuickSelector from '../components/QuickSelector';
import LayerSelector from '../components/MicrocircuitLayerSelector';
import List from '../components/List';
import StickyContainer from '../components/StickyContainer';

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

  const { brain_region: region, prelayer, postlayer, pretype, posttype } = router.query as Record<string, string>;

  const [pathwayIndex, setPathwayIndex] = useState<PathwayIndex>(null);
  const [quickSelection, setQuickSelection] = useState<Record<string, string>>({ region, prelayer, postlayer, pretype, posttype });

  const setParams = (params: Record<string, string>): void => {
    const query = { ...router.query, ...params };
    router.push({ query }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (!router.query.brain_region) {
      const query = defaultSelection.digitalReconstruction.synapticPathways;
      const { brain_region: region, prelayer, pretype, postlayer, posttype } = query;
      setQuickSelection({ region, prelayer, pretype, postlayer , posttype });
      router.replace({ query }, undefined, { shallow: true });
    } else {
      setQuickSelection({ region, prelayer, postlayer, pretype, posttype });
    }
  }, [router.query]);

  const setRegion = (region: Subregion) => {
    setParams({
      'brain_region': region,
    });
  };
  const setQsRegion = (region: Subregion) => {
    setQuickSelection({ ...quickSelection, region });
    setRegion(region);
  };

  const setPreLayerQuery = (layer: Layer) => {
    setParams({
      prelayer: layer,
      postlayer: null,
      pretype: null,
      posttype: null,
    });
  };
  const setQsPreLayer = (prelayer) => {
    const { region } = quickSelection;
    setQuickSelection({ region, prelayer });
  };

  const setPostLayerQuery = (layer: Layer) => {
    setParams({
      postlayer: layer,
      posttype: null,
    });
  };
  const setQsPostLayer = (postlayer) => {
    const { region, prelayer, pretype } = quickSelection;
    setQuickSelection({ region, prelayer, pretype, postlayer });
  };

  const setPreTypeQuery = (pretype: string) => {
    setParams({
      pretype,
      posttype: null,
    });
  };
  const setQsPreType = (pretype) => {
    const { region, prelayer } = quickSelection;
    setQuickSelection({ region, prelayer, pretype });
  };

  const setPostTypeQuery = (posttype: string) => {
    setParams({
      posttype,
    });
  };
  const setQsPostType = (posttype) => {
    const { region, prelayer, pretype, postlayer } = quickSelection;
    setQuickSelection({ region, prelayer, pretype, postlayer, posttype });
    setParams({
      brain_region: region,
      prelayer,
      pretype,
      postlayer,
      posttype,
    });
  };

  const getPreMtypes = (region, prelayer) => {
    if (!pathwayIndex || !region || !prelayer) return [];

    return chunk(pathwayIndex.region[region], 2)
      .map(([preMtypeIdx]) => pathwayIndex.mtypeIdx[preMtypeIdx])
      .filter(onlyUnique)
      .filter(mtype => mtype.match(prelayer === 'L23' ? 'L23|L2|L3' : prelayer))
      .sort();
  };

  const preMtypes = getPreMtypes(region, prelayer);
  const qsPreMtypes = getPreMtypes(quickSelection.region, quickSelection.prelayer);

  const getPostMtypes = (region, pretype, postlayer) => {
    if (!pathwayIndex || !region || !pretype || !postlayer) return [];

    return chunk(pathwayIndex.region[region], 2)
      .filter(([preMtypeIdx]) => pathwayIndex.mtypeIdx[preMtypeIdx] === pretype)
      .map(([, postMtypeIdx]) => pathwayIndex.mtypeIdx[postMtypeIdx])
      .filter(onlyUnique)
      .filter(mtype => mtype.match(postlayer === 'L23' ? 'L23|L2|L3' : postlayer))
      .sort()
  };

  const postMtypes = getPostMtypes(region, pretype, postlayer);
  const qsPostMtypes = getPostMtypes(quickSelection.region, quickSelection.pretype, quickSelection.postlayer);

  const pathway = pretype && posttype
    ? `${pretype}-${posttype}`
    : null;

  useEffect(() => {
    fetch(pathwayIndexPath)
      .then(res => res.json())
      .then(pathwayIndex => setPathwayIndex(pathwayIndex));
  }, []);

  return (
    <>
      <Filters primaryColor={color} hasData={!!pretype && !!posttype}>
        <Row
          className="w-100"
          gutter={[0, 20]}
        >
          <Col
            className="mb-2"
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
            className={`set-accent-color--${color} mb-2`}
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
                    value={region}
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
                    value={prelayer as Layer}
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
                      list={preMtypes}
                      onSelect={setPreTypeQuery as (s: string) => void}
                      title="M-type pre-synaptic"
                      value={pretype}
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
                    disabled={!prelayer || !pretype}
                    onSelect={setPostLayerQuery}
                    value={postlayer as Layer}
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
                      disabled={!postlayer}
                      list={postMtypes}
                      onSelect={setPostTypeQuery as (s: string) => void}
                      title="M-type post-synaptic"
                      value={posttype}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Filters>

      <QuickSelector
        color={color}
        entries={[
          {
            title: 'Subregion',
            currentValue: quickSelection.region,
            values: subregions,
            onChange: setQsRegion,
            width: '80px',
          },
          {
            title: 'Pre-syn layer',
            currentValue: quickSelection.prelayer,
            values: layers,
            onChange: setQsPreLayer,
            width: '70px',
          },
          {
            title: 'Pre-syn M-type',
            currentValue: quickSelection.pretype,
            values: qsPreMtypes,
            onChange: setQsPreType,
            width: '100px',
          },
          {
            title: 'Post-syn layer',
            currentValue: quickSelection.postlayer,
            values: layers,
            onChange: setQsPostLayer,
            width: '70px',
          },
          {
            title: 'Post-syn M-type',
            currentValue: quickSelection.posttype,
            values: qsPostMtypes,
            onChange: setQsPostType,
            width: '100px',
          },
        ]}
      />

      {!!children && children(region as Subregion, pathway as string)}
    </>
  );
};

export default SynapticPathways;
