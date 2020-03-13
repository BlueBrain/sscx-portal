import * as React from 'react';
import { Resource } from '@bbp/nexus-sdk';
import { Color } from '../../types';
import List from '../List';
import EphysContainer from './EphysContainer';
import EphysGraphComponent from './EphysGraph';
import InfoBox from '../InfoBox';
import Loading from '../Loading';

export type Distribution = {
  '@type': 'DataDownload';
  contentSize: { unitCode: 'bytes'; value: number };
  contentUrl: string;
  encodingFormat: string;
  name: string;
};

export type EphysResponse = {
  _source: Resource<{
    distribution: Distribution | Distribution[];
    stimulus: {
      '@type': 'Stimulus';
      stimulusType: {
        '@id': string;
        label: string;
      };
    };
  }>;
};

const EphysViewer: React.FC<{ data: EphysResponse[]; colorName: Color }> = ({
  data,
  colorName,
}) => {
  const stimulusTypes = data.map(
    entry => entry._source.stimulus.stimulusType.label,
  );

  const [stimulusTypeSelection, setStimulusTypeSelection] = React.useState<
    string
  >(stimulusTypes[0]);

  const handleSelectStimulusType = (value: string) => {
    setStimulusTypeSelection(value);
  };

  const selectedHit = data.find(
    entry =>
      entry._source.stimulus.stimulusType.label === stimulusTypeSelection,
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <List
          title="Simulus Type"
          list={stimulusTypes}
          defaultValue={stimulusTypeSelection}
          onSelect={handleSelectStimulusType}
          color={colorName}
        />
        <InfoBox text={'This might be a good spot to put an explainer'} />
      </div>

      {!!selectedHit && (
        <EphysContainer resource={selectedHit._source}>
          {({ loading, error, data }) => (
            // TODO: What to do with errors?
            <div>
              {loading && <Loading size="big">Loading data...</Loading>}
              {data && (
                <EphysGraphComponent
                  dataset={data.processedTrace}
                  iUnit={data.iUnit}
                  vUnit={data.vUnit}
                />
              )}
            </div>
          )}
        </EphysContainer>
      )}
    </div>
  );
};

export default EphysViewer;
