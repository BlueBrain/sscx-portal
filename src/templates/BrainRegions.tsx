import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

import BrainRegionSelector from '../components/BrainRegionSelector';
import { Subregion } from '../types';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Filters from '../layouts/Filters';
import { Color } from '../types';

import selectorStyle from '../styles/selector.module.scss';


export type BrainRegionTemplateProps = {
  color: Color;
  sectionTitle: string;
  children?: (subregion: string) => React.ReactNode;
};

const BrainRegions: React.FC<BrainRegionTemplateProps> = ({
  color,
  sectionTitle,
  children,
}) => {
  const router = useRouter();
  const query = router.query;

  const setBrainRegionQuery = (brainRegion: Subregion) => {
    const query = {
      brain_region: brainRegion,
    };
    router.push({ query, pathname: router.pathname }, undefined, { shallow: true });
  };
  const currentRegion = query.brain_region as Subregion;

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentRegion}>
        <Row
          className="w-100"
          align="bottom"
          gutter={[0,20]}
        >
          <Col
            xs={24}
            md={10}
            xl={8}
            xxl={12}
          >
            <Title
              primaryColor={color}
              title="Brain Regions"
              subtitle={sectionTitle}
              hint="Select a subregion of interest in the S1 of the rat brain."
            />
            <InfoBox>
              <p>
                We digitally reconstructed the non-barrel hind limb primary rat Somatosensory Cortex
                consisting of eight sub-regions, four million neurons mediated by four billion synapses.
              </p>
            </InfoBox>
          </Col>

          <Col
            className={`mt-2 set-accent-color--${color}`}
            xs={24}
            md={14}
            xl={16}
            xxl={12}
          >
              <div className={selectorStyle.row} style={{ maxWidth: '32rem' }}>
                  <div className={selectorStyle.column}>
                    <div className={selectorStyle.head}>Choose a subregion</div>
                    <div className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`} style={{ padding: '2rem 4rem' }}>
                      <BrainRegionSelector
                        color={color}
                        value={currentRegion}
                        onSelect={setBrainRegionQuery}
                      />
                    </div>
                  </div>
            </div>
          </Col>
        </Row>
      </Filters>

      {!!children && children(currentRegion)}
    </>
  );
};

export default BrainRegions;
