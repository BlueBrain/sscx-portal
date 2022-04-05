import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Spin } from 'antd';

import LayerSelector from '../components/AnatomyLayerSelector';
import QuickSelector from '../components/QuickSelector';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import StickyContainer from '../components/StickyContainer';
import Filters from '../layouts/Filters';
import { Layer, Color } from '../types';
import { defaultSelection, layers } from '../constants';

import selectorStyle from '../styles/selector.module.scss';


export type LayerAnatomyTemplateProps = {
  color: Color;
  sectionTitle: string;
  children: (
    layer: Layer,
  ) => React.ReactNode;
};

const LayerAnatomy: React.FC<LayerAnatomyTemplateProps> = ({
  color,
  sectionTitle,
  children,
}) => {
  const router = useRouter();

  const { layer } = router.query;

  const setLayerQuery = (layer: Layer) => {
    const query = { layer };
    router.push({ query }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!router.query.layer && router.isReady) {
      const query = defaultSelection.experimentalData.layerAnatomy;
      router.replace({ query }, undefined, { shallow: true });
    }
  }, [router, router.query]);

  return (
    <>
      <Filters primaryColor={color} hasData={!!layer}>
        <Row
          className="w-100"
          gutter={[0,20]}
        >
          <Col
            className="mb-2"
            xs={24}
            lg={12}
          >
            <StickyContainer>
              <Title
                primaryColor={color}
                title="Layer Anatomy"
                subtitle={sectionTitle}
              />
              <div role="information">
                <InfoBox>
                  <p>
                    The rat primary somatosensory cortex (SSCx) is responsible for the processing of sensory information
                    such as touch from the entire body. <br/>
                    It has a laminar structure where neurons are organized across six distinct layers - with layer 1
                    at the surface and layer 6 at the bottom. <br/>
                    This section showcases the data we have acquired and organized on the anatomy of SSCx
                    from cortical slices in developing rats.
                  </p>
                </InfoBox>
              </div>
            </StickyContainer>
          </Col>

          <Col
            className={`set-accent-color--${color} mb-2`}
            xs={24}
            lg={12}
          >
            <div className={selectorStyle.row} style={{ maxWidth: '26rem' }}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>Select a layer</div>
                <div className={selectorStyle.body} style={{ padding: '2rem 4rem' }}>
                  <LayerSelector
                    color={color}
                    value={layer as Layer}
                    onSelect={setLayerQuery}
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
            currentValue: layer as Layer,
            values: layers,
            onChange: setLayerQuery,
          },
        ]}
      />

      {children(layer as Layer)}
    </>
  );
};

export default LayerAnatomy;
