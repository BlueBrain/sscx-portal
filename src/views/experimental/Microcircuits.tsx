import React from 'react';
import Filters from '../../layouts/Filters';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import { primaryColor } from './config';
import Selector from '../../components/Selector';
import MicrocircuitSelector, { MicrocircuitLayer } from '../../components/MicrocircuitSelector';
import useQuery from '../../hooks/useQuery';
import { useHistory } from 'react-router';

const Microcircuits: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const setLayerQuery = (layer: MicrocircuitLayer) => {
    history.push(`?layer=${layer}`);
  };
  const currentLayer: MicrocircuitLayer = query.get('layer') as MicrocircuitLayer;

  return (
    <Filters primaryColor={primaryColor} backgroundAlt>
      <div className="center-col">
        <Title
          primaryColor={primaryColor}
          title="Microcircuits"
          subtitle="Experimental Data"
          hint="Select a microcircuit of interest."
        />
        {!!currentLayer && (<div>
          <InfoBox title="Longer Text" text={lorem} />
          <br />
          <InfoBox text={`This one has no title o_0\n${lorem}`} />
        </div>)}
      </div>
      <div className="center-col">
        <Selector title="Choose a layer">
          <MicrocircuitSelector
            color={primaryColor}
            defaultActiveLayer={currentLayer}
            onLayerSelected={setLayerQuery}
          />
        </Selector>
      </div>
    </Filters>
  );
};

export default Microcircuits;
