import React from 'react';
import { primaryColor } from './config';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import Filters from '../../layouts/Filters';

const NeuronMorphology: React.FC = () => (
  <Filters primaryColor={primaryColor}>
    <div className="center-col">
      <Title
        primaryColor={primaryColor}
        title="Neuromorphology"
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
      <p>Neuron morphology view</p>
    </div>
  </Filters>
);

export default NeuronMorphology;
