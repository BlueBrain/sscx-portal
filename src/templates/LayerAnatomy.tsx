import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

import LayerSelector from '../components/AnatomyLayerSelector';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import { StickyContainer } from '../components/StickyContainer';
import Filters from '../layouts/Filters';
import { Layer, Color } from '../types';
import { defaultSelection } from '../constants';

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
  const currentLayer: Layer = layer as Layer;

  const setLayerQuery = (layer: Layer) => {
    const query = { layer };
    router.push({ query }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!router.query.layer && router.isReady) {
      const query = defaultSelection.experimentalData.layerAnatomy;
      router.replace({ query }, undefined, { shallow: true });
    }
  }, [router.query]);

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentLayer}>
        <Row
          className="w-100"
          gutter={[0,20]}
        >
          <Col
            xs={24}
            lg={12}
          >
            <StickyContainer>
              <Title
                primaryColor={color}
                title="Layer Anatomy"
                subtitle={sectionTitle}
                hint={<p>
                  The Somatosensory Cortex has a laminar structure where neurons are organized across six distinct layers.
                </p>}
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
            className={`set-accent-color--${color}`}
            xs={24}
            lg={12}
          >
            <div className={selectorStyle.row} style={{ maxWidth: '26rem' }}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>Select a layer</div>
                <div className={selectorStyle.body} style={{ padding: '2rem 4rem' }}>
                  <LayerSelector
                    color={color}
                    value={currentLayer}
                    onSelect={setLayerQuery}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Filters>

      {children(currentLayer)}
    </>
  );
};

export default LayerAnatomy;
