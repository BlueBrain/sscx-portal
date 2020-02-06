import React from 'react';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import Filters from '../../layouts/Filters';
import { primaryColor } from './config';
import Pills from '../../components/Pills';
import Selector from '../../components/Selector';
import SynapticPathwaySelector from '../../components/SynapticPathwaySelector';
import useQuery from '../../hooks/useQuery';
import { useHistory } from 'react-router';
import { Layer } from '../../types';

const BrainRegions: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const currentPreLayer: Layer = query.get('pre') as Layer;
  const currentPostLayer: Layer = query.get('post') as Layer;

  const setPreLayerQuery = (layer: Layer) => {
    history.push(
      `?${new URLSearchParams({
        pre: layer,
        post: currentPostLayer,
      }).toString()}`,
    );
  };
  const setPostLayerQuery = (layer: Layer) => {
    history.push(
      `?${new URLSearchParams({
        pre: currentPreLayer,
        post: layer,
      }).toString()}`,
    );
  };

  const hasData = currentPreLayer && currentPostLayer;

  return (
    <Filters primaryColor={primaryColor} hasData={!!hasData}>
      <div className="center-col">
        <Title
          primaryColor={primaryColor}
          title="Synaptic Pathways"
          subtitle="Reconstruction Data"
          hint="Select a subregion of interest in the S1 of the rat brain."
        />
        {!!hasData && (
          <div>
            <InfoBox title="Longer Text" text={lorem} color={primaryColor} />
            <br />
            <Pills
              title="1. Select a brain layer"
              list={['L1', 'L23', 'L4', 'L5', 'L6']}
              selected="L23"
              onSelect={() => undefined}
            />
          </div>
        )}
      </div>
      <div className="center-col">
        <Selector title="1. Choose two layers" column>
          <SynapticPathwaySelector
            color={primaryColor}
            defaultActivePreLayer={currentPreLayer}
            onPreLayerSelected={setPreLayerQuery}
            defaultActivePostLayer={currentPostLayer}
            onPostLayerSelected={setPostLayerQuery}
          />
        </Selector>
      </div>
    </Filters>
  );
};

export default BrainRegions;
