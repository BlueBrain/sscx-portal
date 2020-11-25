import React from 'react';
import Title from '../components/Title';
import FullPage from '../layouts/FullPage';
import { accentColors } from '../config';
import { Color } from '../types';
import './Glossary.less';


const colorName: Color = 'lavender';
const color = accentColors[colorName];

const Contact: React.FC = () => {

  return (
    <FullPage>
      <Title title="Contact" primaryColor={colorName} />

      <div className="glossary__container">

        <Title subtitle="Please contact us at:" primaryColor={colorName} />
        <a href="mailto:nmc.portal@epfl.ch">nmc.portal@epfl.ch</a>

      </div>
    </FullPage>
  );
};


export default Contact;