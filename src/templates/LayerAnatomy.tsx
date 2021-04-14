import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import ServerSideContext from '../context/server-side-context';
import LayerAnatomySelector from '../components/LayerAnatomySelector';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Selector from '../components/Selector';
import Filters from '../layouts/Filters';
import { Layer, Color } from '../types';


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
  const serverSideContext = useContext(ServerSideContext);

  const query = { ...serverSideContext?.query, ...router?.query };

  const setLayerQuery = (layer: Layer) => {
    router.push({ query: { layer }, pathname: router.pathname}, undefined, { shallow: true });
  };
  const currentLayer: Layer = query.layer as Layer;

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentLayer}>
        <div className="center-col">
          <Title
            primaryColor={color}
            title="Layer Anatomy"
            subtitle={sectionTitle}
            hint="The Somatosensory Cortex has a laminar structure <br> where neurons are organized across six distinct layers."
          />
          <div role="information">
            <InfoBox>
              <p>The rat primary somatosensory cortex (SSCx) is responsible for the processing of sensory information such as touch from the entire body. <br/> It has a laminar structure where neurons are organized across six distinct layers - with layer 1 at the surface and layer 6 at the bottom. <br/> This section showcases the data we have acquired and organized on the anatomy of SSCx from cortical slices in developing rats.</p>
              <h3>Layer thickness: S1</h3>
              <p>Data are provided in the form of raw microscopy images of NeuN (neuron-specific nuclear protein) stained coronal slices with annotations of individual layer extents, and spreadsheets summarizing measurements of layer thicknesses.</p>
              <h3>Neuronal density</h3>
              <p>Data are given as raw microscopy images of NeuN stained slices with annotations of individual layer extents, and spreadsheets summarizing measurements of neuron counts across different layers.</p>
            </InfoBox>
          </div>
        </div>
        <div className="center-col">
          <Selector title="Choose a layer">
            <LayerAnatomySelector
              color={color}
              activeLayer={currentLayer}
              onLayerSelected={setLayerQuery}
            />
          </Selector>
        </div>
      </Filters>

      {children(currentLayer)}
    </>
  );
};

export default LayerAnatomy;
