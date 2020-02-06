import React from 'react';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import Filters from '../../layouts/Filters';
import { primaryColor } from './config';
import Pills from '../../components/Pills';

const BrainRegions: React.FC = () => {
  return (
    <Filters primaryColor={primaryColor}>
      <div className="center-col">
        <Title
          primaryColor={primaryColor}
          title="Synaptic Pathways"
          subtitle="Reconstruction Data"
          hint="Select a subregion of interest in the S1 of the rat brain."
        />
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
      </div>
      <div className="center-col">
        <span>TODO: Synaptic pathways selector</span>
      </div>
    </Filters>
  );
};

export default BrainRegions;
