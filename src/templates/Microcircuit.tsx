import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

import Filters from '../layouts/Filters';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import LayerSelector from '../components/MicrocircuitLayerSelector';
import { Layer, Color, Subregion } from '../types';
import Pills from '../components/Pills';
import StickyContainer from '../components/StickyContainer';

import { subregionTitle, subregions, defaultSelection } from '../constants';

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

  const { brain_region, layer } = router.query;

  const setQuery = (query: any) => {
    router.push({ query, pathname: router.pathname }, undefined, { shallow: true });
  };

  const currentRegion: Subregion = brain_region as Subregion;
  const currentLayer: Layer = layer as Layer;

  useEffect(() => {
    if (!router.query.brain_region && router.isReady) {
      const query = defaultSelection.digitalReconstruction.microcircuit;
      router.replace({ query }, undefined, { shallow: true });
    }
  }, [router.query]);

  const setRegion = (region: Subregion) => {
    setQuery({
      layer: currentLayer,
      brain_region: region,
    });
  };
  const setLayer = (layer: Layer) => {
    setQuery({
      layer,
      brain_region: currentRegion,
    });
  };

  const layerNums = currentLayer
    ? currentLayer
      .replace('L', '')
      .split('')
      .map(numStr => parseInt(numStr))
    : [];

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentLayer && !!currentRegion}>
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
                    value={currentRegion}
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
                    value={currentLayer}
                    onSelect={setLayer}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Filters>

      {!!children && children(currentRegion, layerNums)}
    </>
  );
};

export default Microcircuit;
