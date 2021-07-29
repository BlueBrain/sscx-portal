import React from 'react';

import Title from '../../components/Title';
import FullPage from '../../layouts/FullPage';
import { basePath } from '../../config';
import { Color } from '../../types';
import glossaryContent from './glossary-content.json';
import glossaryTablesContent from './tables-content.json';
import ResponsiveTable from '../../components/ResponsiveTable';

const colorName: Color = 'lavender';

type SpikeTable = {
  '_': string;
  'non-accommodating': string;
  'accommodating': string;
  'stuttering': string;
  'irregular-spiking': string;
}

const spikeColumns = [
  { dataIndex: '_' as keyof SpikeTable, title: '' },
  { dataIndex: 'non-accommodating' as keyof SpikeTable, title: 'non-accommodating' },
  { dataIndex: 'accommodating' as keyof SpikeTable, title: 'accommodating' },
  { dataIndex: 'stuttering' as keyof SpikeTable, title: 'stuttering' },
  { dataIndex: 'irregular-spiking' as keyof SpikeTable, title: 'irregular-spiking' },
];


type FiringTable = {
  '_': string;
  'classical': string;
  'bursting': string;
  'delayed': string;
}

const firingColumns = [
  { dataIndex: '_' as keyof FiringTable, title: '' },
  { dataIndex: 'classical' as keyof FiringTable, title: 'classical' },
  { dataIndex: 'bursting' as keyof FiringTable, title: 'bursting' },
  { dataIndex: 'delayed' as keyof FiringTable, title: 'delayed' },
];


const eTypesColumns = [
  { dataIndex: '_' as keyof FiringTable, title: '' },
  { dataIndex: 'classical' as keyof FiringTable, title: 'classical' },
  { dataIndex: 'bursting' as keyof FiringTable, title: 'bursting' },
  { dataIndex: 'delayed' as keyof FiringTable, title: 'delayed' },
];

const imageBase = `${basePath}/assets/images/glossary`;

const generateImgElem = (imgName) => {
  if (!imgName) return '';
  console.log(imgName);
  const imgElem = React.createElement('img', {
    src: `${imageBase}/${imgName}`,
    className: 'e-type-img',
  });
  return imgElem;
};

const getETypeData = () => (
  glossaryTablesContent['e-types'].map((row) => {
    const classical = generateImgElem(row.classical);
    const bursting = generateImgElem(row.bursting);
    const delayed = generateImgElem(row.delayed);
    return { '_': row._, classical, bursting, delayed };
  })
);

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

            {(glossaryContent as any)[sectionLabel].map(([term, description]: [term: any, d: any]) => (
              <div className="row mt-2" key={term}>
                <div className="col-xs-5 col-lg-4 term">
                  <strong dangerouslySetInnerHTML={{ __html: term }} />
                </div>
                <div className="col-xs-7 col-lg-8">
                  <span dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              </div>
            ))}
          </section>
        ))}

        <h4>E-Types</h4>
        <ResponsiveTable
          columns={eTypesColumns}
          data={getETypeData()}
          rowKey={({ name }) => name}
        />

        <h4>Spike Characteristics</h4>
        <ResponsiveTable
          columns={spikeColumns}
          data={glossaryTablesContent.spike}
          rowKey={({ name }) => name}
        />

        <h4>Firing Behavior</h4>
        <ResponsiveTable
          columns={firingColumns}
          data={glossaryTablesContent.firing}
          rowKey={({ name }) => name}
        />
      </div>
    </FullPage>
  );
};


export default Glossary;
