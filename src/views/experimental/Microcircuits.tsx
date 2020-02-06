import React from 'react';
import Filters from '../../layouts/Filters';
import Title from '../../layouts/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import { primaryColor } from './config';

const Microcircuits: React.FC = () => {
  return (
    <Filters primaryColor={primaryColor} backgroundAlt>
      <div className="center-col">
        <Title
          primaryColor={primaryColor}
          title="Microcircuits"
          subtitle="Experimental Data"
          hint="Select a microcircuit of interest."
        />
        <div>
          <InfoBox title="Longer Text" text={lorem} />
          <br />
          <InfoBox text={`This one has no title o_0\n${lorem}`} />
        </div>
      </div>
      <div className="center-col">
        <span>TODO: Microcircuit Selector</span>
      </div>
    </Filters>
  );
};

export default Microcircuits;
