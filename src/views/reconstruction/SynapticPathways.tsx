import React from 'react';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import Filters from '../../layouts/Filters';
import { primaryColor, colorName } from './config';
import Pills from '../../components/Pills';
import useQuery from '../../hooks/useQuery';
import { useHistory } from 'react-router';
import { Layer } from '../../types';
import SynapticTypesSelector from '../../components/SynapticTypesSelector';

const mTypes = ['a', 'b', 'c', 'd', 'e', 'f'];

const BrainRegions: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const addParam = (key: string, value: string): void => {
    query.set(key, value);
    history.push(`?${query.toString()}`);
  };

  const currentPreLayer: Layer = query.get('prelayer') as Layer;
  const currentPostLayer: Layer = query.get('postlayer') as Layer;
  const currentPreType: string = query.get('pretype');
  const currentPostType: string = query.get('posttype');

  const setPreLayerQuery = (layer: Layer) => addParam('prelayer', layer);
  const setPostLayerQuery = (layer: Layer) => addParam('postlayer', layer);
  const setPreTypeQuery = (layer: Layer) => addParam('pretype', layer);
  const setPostTypeQuery = (layer: Layer) => addParam('posttype', layer);

  const hasData =
    currentPreLayer && currentPostLayer && currentPreType && currentPostType;

  return (
    <Filters primaryColor={colorName} hasData={!!hasData}>
      <div className="center-col">
        <Title
          primaryColor={colorName}
          title="Synaptic Pathways"
          subtitle="Reconstruction Data"
          hint="Select a subregion of interest in the S1 of the rat brain."
        />
        {!!hasData && (
          <div>
            <InfoBox title="Longer Text" text={lorem} color={colorName} />
            <br />
            <Pills
              title="3. Select a brain layer (optional)"
              list={['L1', 'L23', 'L4', 'L5', 'L6']}
              defaultValue="L23"
              onSelect={() => undefined}
              color={colorName}
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
          onPostTypeSelect={setPostTypeQuery}
          onPreTypeSelect={setPreTypeQuery}
          selectedPreType={currentPreType}
          selectedPostType={currentPostType}
        />
      </div>
    </Filters>
  );
};

export default BrainRegions;
