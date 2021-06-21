import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

import Filters from '../layouts/Filters';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import LayerSelector from '../components/MicrocircuitLayerSelector';
import { Layer, Color } from '../types';
import Pills from '../components/Pills';
import { Subregion } from '../types';

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

  const query = router.query;

  const setQuery = (query: any) => {
    router.push({ query, pathname: router.pathname }, undefined, { shallow: true });
  };

  const currentRegion: Subregion = query.brain_region as Subregion;
  const currentLayer: Layer = query.layer as Layer;

  const setRegion = (region: Subregion) => {
    setQuery({
      layer: currentLayer,
      brain_region: region,
    });
  }
  const setLayer = (layer: Layer) => {
    setQuery({
      layer,
      brain_region: currentRegion,
    });
  }

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
          align="bottom"
          gutter={16}
        >
          <Col
            xs={24}
            xl={8}
            xxl={12}
          >
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
                  and their synaptic interactions.
                </p>
              </InfoBox>
            </div>
          </Col>

          <Col
            className={`mt-2 set-accent-color--${color}`}
            xs={24}
            xl={16}
            xxl={12}
          >
            <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
              <div className={selectorStyle.row}>
                <div className={selectorStyle.column}>
                  <div className={selectorStyle.head}>1. Choose a subregion</div>
                  <div className={selectorStyle.body} style={{ padding: '1rem 2rem' }}>
                    <Pills
                      list={['S1DZ', 'S1DZO', 'S1FL', 'S1HL', 'S1J', 'S1Sh', 'S1Tr', 'S1ULp']}
                      defaultValue={currentRegion}
                      onSelect={setRegion as (s: string) => void}
                      color={color}
                    />
                  </div>
                </div>
              </div>
              <div className={selectorStyle.row}>
                <div className={selectorStyle.column}>
                  <div className={selectorStyle.head}>2. Choose a layer</div>
                  <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '2rem 4rem' }}>
                    <LayerSelector
                      color={color}
                      maxWidth="14rem"
                      value={currentLayer}
                      onSelect={setLayer}
                    />
                  </div>
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
