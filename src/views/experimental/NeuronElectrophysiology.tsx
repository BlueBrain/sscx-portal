import React from 'react';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import Filters from '../../layouts/Filters';
import { primaryColor } from './config';

const NeuronElectrophysiology: React.FC = () => (
  <Filters primaryColor={primaryColor}>
    <div className="center-col">
      <Title
        primaryColor={primaryColor}
        title="Electrophysiology"
        subtitle="Experimental Data"
        hint="Select a layer of interest in the S1 of the rat brain."
      />
      <div>
        <InfoBox title="Longer Text" text={lorem} />
        <br />
        <InfoBox text={`This one has no title o_0\n${lorem}`} />
      </div>
    </div>
    <div className="center-col">
      <p>Neuron electrophysiology view</p>
    </div>
  </Filters>
);

export default NeuronElectrophysiology;
