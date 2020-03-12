import React, { Children } from 'react';
import { useHistory } from 'react-router-dom';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import LayerAnatomySelector from '../components/LayerAnatomySelector';
import Title from '../components/Title';
import InfoBox from '../components/InfoBox';
import Selector from '../components/Selector';
import useQuery from '../hooks/useQuery';
import Filters from '../layouts/Filters';
import { Layer, Color } from '../types';
import { accentColors } from '../config';
import { lorem } from '../views/Styleguide';
import Data from '../layouts/Data';

export type LayerAnatomyTemplateProps = {
  color: Color;
  sectionTitle: string;
  dataQuery: (layers: string | string[]) => any;
  children: (
    data: ElasticSearchViewQueryResponse<any>['hits']['hits'],
  ) => React.ReactNode;
};

const layersMapping = {
  L1: 'layer 1',
  L23: ['layer 2', 'layer 3'],
  L4: 'layer 4',
  L5: 'layer 5',
  L6: 'layer 6',
};

const LayerAnatomy: React.FC<LayerAnatomyTemplateProps> = ({
  color,
  sectionTitle,
  dataQuery,
  children,
}) => {
  const query = useQuery();
  const history = useHistory();

  const setLayerQuery = (layer: Layer) => {
    history.push(`?layer=${layer}`);
  };
  const currentLayer: Layer = query.get('layer') as Layer;
  const currentQuery = currentLayer
    ? dataQuery(layersMapping[currentLayer])
    : {};

  return (
    <>
      <Filters primaryColor={color} backgroundAlt hasData={!!currentLayer}>
        <div className="center-col">
          <Title
            primaryColor={color}
            title="Layer Anatomy"
            subtitle={sectionTitle}
            hint="Select a layer of interest in the S1 of the rat brain."
          />
          {!!currentLayer && (
            <div role="information">
              <InfoBox title="Longer Text" text={lorem} color={color} />
              <br />
              <InfoBox text={`This one has no title o_0\n${lorem}`} />
            </div>
          )}
        </div>
        <div className="center-col">
          <Selector title="Choose a layer">
            <LayerAnatomySelector
              color={accentColors[color]}
              defaultActiveLayer={currentLayer}
              onLayerSelected={setLayerQuery}
            />
          </Selector>
        </div>
      </Filters>
      <Data hasData={!!currentLayer} query={currentQuery}>
        {data => children(data)}
      </Data>
    </>
  );
};

export default LayerAnatomy;
