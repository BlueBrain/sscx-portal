import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

import LayerSelector from '../components/AnatomyLayerSelector';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Filters from '../layouts/Filters';
import { Layer, Color } from '../types';

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
  const { query } = router;

  const setLayerQuery = (layer: Layer) => {
    router.push({ query: { layer }, pathname: router.pathname}, undefined, { shallow: true });
  };
  const currentLayer: Layer = query.layer as Layer;

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentLayer}>
        <Row
          align="bottom"
          className="w-100"
          gutter={[0,20]}
        >
          <Col
            xs={24}
            xl={12}
          >
            <div style={{ maxWidth: '560px' }}>
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
                  <h3>Layer thickness: S1</h3>
                  <p>
                    Data are provided in the form of raw microscopy images of NeuN
                    (neuron-specific nuclear protein) stained coronal slices with annotations of individual layer extents,
                    and spreadsheets summarizing measurements of layer thicknesses.
                  </p>
                  <h3>Neuronal density</h3>
                  <p>Data are given as raw microscopy images of NeuN stained slices with annotations of
                    individual layer extents, and spreadsheets summarizing measurements of neuron counts
                    across different layers.
                  </p>
                </InfoBox>
              </div>
            </div>
          </Col>

          <Col
            className={`set-accent-color--${color}`}
            xs={24}
            xl={12}
          >
            <div className={selectorStyle.row} style={{ maxWidth: '26rem' }}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>Choose a layer</div>
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
