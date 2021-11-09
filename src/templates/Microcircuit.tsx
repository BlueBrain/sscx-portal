import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

import Filters from '../layouts/Filters';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import LayerSelector from '../components/MicrocircuitLayerSelector';
import QuickSelector from '../components/QuickSelector';
import { Layer, Color, Subregion } from '../types';
import Pills from '../components/Pills';
import StickyContainer from '../components/StickyContainer';

import { subregionTitle, subregions, layers, defaultSelection } from '../constants';

import selectorStyle from '../styles/selector.module.scss';


export type MicrocircuitTemplateProps = {
  color: Color;
  sectionTitle: string;
  children?: (subregion: string, layerNums: number[]) => React.ReactNode;
};

const Microcircuit: React.FC<MicrocircuitTemplateProps> = ({
  color,
  sectionTitle,
  children,
}) => {
  const router = useRouter();

  const { brain_region: region, layer } = router.query as Record<string, string>;

  const setQuery = (query: any) => {
    router.push({ query, pathname: router.pathname }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!router.query.brain_region && router.isReady) {
      const query = defaultSelection.digitalReconstruction.microcircuit;
      router.replace({ query }, undefined, { shallow: true });
    }
  }, [router.query]);

  const setRegion = (newRegion: Subregion) => {
    setQuery({
      layer: layer,
      brain_region: newRegion,
    });
  };
  const setLayer = (layer: Layer) => {
    setQuery({
      layer,
      brain_region: region,
    });
  };

  const layerNums = layer
    ? layer
      .replace('L', '')
      .split('')
      .map(numStr => parseInt(numStr))
    : [];

  return (
    <>
      <Filters primaryColor={color} hasData={!!layer && !!region}>
        <Row
          className="w-100"
          gutter={[0, 20]}
        >
          <Col
            className="mb-2"
            xs={24}
            xl={8}
            xxl={12}
          >
            <StickyContainer>
              <Title
                primaryColor={color}
                title="Microcircuit"
                subtitle={sectionTitle}
              />
              <div>
                <InfoBox>
                  <p>
                    A neuronal microcircuit is the smallest functional ecosystem in any brain region that
                    encompasses a diverse morphological and electrical assortment of neurons,
                    and their synaptic interactions. Blue Brain has pioneered data-driven digital
                    reconstructions and simulations of microcircuits to investigate how local neuronal
                    structure gives rise to global network dynamics. These methods could be extended to
                    digitally reconstruct microcircuits in any brain region. Here we focus on the SSCx.
                  </p>
                </InfoBox>
              </div>
            </StickyContainer>
          </Col>

          <Col
            className={`mb-2 set-accent-color--${color}`}
            xs={24}
            xl={16}
            xxl={12}
          >
            <div className={selectorStyle.row} style={{ maxWidth: '32rem' }}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>1. Select a subregion</div>
                <div className={selectorStyle.body} style={{ padding: '1rem 2rem' }}>
                  <Pills
                    list={subregions}
                    titles={subregions.map(subregion => subregionTitle[subregion])}
                    value={region}
                    onSelect={setRegion as (s: string) => void}
                    color={color}
                  />
                </div>
              </div>
            </div>
            <div className={selectorStyle.row} style={{ maxWidth: '32rem' }}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>2. Select a layer</div>
                <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '2rem 4rem' }}>
                  <LayerSelector
                    color={color}
                    value={layer as Layer}
                    onSelect={setLayer}
                  />
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
            title: 'Brain region',
            currentValue: region,
            values: subregions,
            onChange: setRegion,
          },
          {
            title: 'Layer',
            currentValue: layer,
            values: layers,
            onChange: setLayer,
          },
        ]}
      />

      {!!children && children(region, layerNums)}
    </>
  );
};

export default Microcircuit;
