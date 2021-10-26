import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

import BrainRegionSelector from '../components/BrainRegionSelector';
import { Subregion } from '../types';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import { StickyContainer } from '../components/StickyContainer';
import Filters from '../layouts/Filters';
import { Color } from '../types';
import { defaultSelection } from '../constants';

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

  const { brain_region } = router.query;

  const setBrainRegionQuery = (brainRegion: Subregion) => {
    const query = { brain_region: brainRegion };
    router.push({ query }, undefined, { shallow: true });
  };
  const currentRegion = brain_region as Subregion;

  useEffect(() => {
    if (!router.query.brain_region && router.isReady) {
      const query = defaultSelection.digitalReconstruction.brainRegions;
      router.replace({ query }, undefined, { shallow: true });
    }
  }, [router.query]);

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentRegion}>
        <Row
          className="w-100"
          gutter={[0,20]}
        >
          <Col
            xs={24}
            xl={8}
            xxl={12}
          >
            <StickyContainer>
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
            </StickyContainer>
          </Col>

          <Col
            className={`mt-2 set-accent-color--${color}`}
            xs={24}
            xl={16}
            xxl={12}
          >
              <div className={selectorStyle.row} style={{ maxWidth: '32rem' }}>
                  <div className={selectorStyle.column}>
                    <div className={selectorStyle.head}>Select a subregion</div>
                    <div
                      className={`${selectorStyle.body} ${selectorStyle.centeredBodyContent}`}
                      style={{ padding: '2rem 4rem' }}
                    >
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
