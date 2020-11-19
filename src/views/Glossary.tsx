import React from 'react';
import Title from '../components/Title';
import FullPage from '../layouts/FullPage';
import { accentColors } from '../config';
import { Color } from '../types';
import glossaryContent from './glossary-content.json';

import './Glossary.less';


const colorName: Color = 'lavender';
const color = accentColors[colorName];

const Glossary: React.FC = () => {
  const sectionLabels = Object.keys(glossaryContent);

  return (
    <FullPage>
      <Title title="Glossary" primaryColor={colorName} />

      <div className="glossary__container">
        {sectionLabels.map(sectionLabel => (
          <section key={sectionLabel}>
            {sectionLabel !== 'Glossary' && (
              <Title subtitle={sectionLabel} primaryColor={colorName} />
            )}

            {glossaryContent[sectionLabel].map(([term, description]) => (
              <div className="row mt-2" key={term}>
                <div className="col-xs-4 col-md-3">
                  <strong dangerouslySetInnerHTML={{ __html: term }} />
                </div>
                <div className="col-xs-8 col-md-9">
                  <span dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              </div>
            ))}
          </section>
        ))}

        <img style={{ width: '100%' }} src={require('url:../assets/images/etypes.png')} alt="etype" />

        <h4>Spike Characteristics</h4>
        <img style={{ width: '100%' }} src={require('url:../assets/images/spike.png')} alt="spike" />

        <h4>Firing Behavior</h4>
        <img style={{ width: '100%' }} src={require('url:../assets/images/firing-behavior.png')} alt="spike" />
      </div>
    </FullPage>
  );
};


export default Glossary;
