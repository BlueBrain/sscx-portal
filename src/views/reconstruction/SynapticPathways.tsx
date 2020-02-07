import React from 'react';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import Filters from '../../layouts/Filters';
import { primaryColor } from './config';
import Pills from '../../components/Pills';
import useQuery from '../../hooks/useQuery';
import { useHistory } from 'react-router';
import { Layer } from '../../types';
import SynapticTypesSelector from '../../components/SynapticTypesSelector';

const mTypes = ['a', 'b', 'c', 'd', 'e', 'f'];

const BrainRegions: React.FC = () => {
  const query = useQuery();

  console.log(query);

  const history = useHistory();

  const currentPreLayer: Layer = query.get('prelayer') as Layer;
  const currentPostLayer: Layer = query.get('postlayer') as Layer;
  const currentPreType: string = query.get('pretype');
  const currentPostType: string = query.get('posttype');

  const setPreLayerQuery = (layer: Layer) => {
    history.push(
      `?${new URLSearchParams({
        prelayer: layer,
      }).toString()}`,
    );
  };
  const setPostLayerQuery = (layer: Layer) => {
    query.append('postlayer', layer);
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
        <SynapticTypesSelector
          color={primaryColor}
          defaultActivePreLayer={currentPreLayer}
          onPreLayerSelected={setPreLayerQuery}
          defaultActivePostLayer={currentPostLayer}
          onPostLayerSelected={setPostLayerQuery}
          synapticTypes={mTypes}
          synapticTypesName="M-types"
        />
      </div>
    </Filters>
  );
};

export default BrainRegions;
