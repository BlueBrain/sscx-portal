import React from 'react';

import './style.less';
import Selector from '../Selector';
import SynapticPathwaySelector, {
  SynapticPathwaySelectProps,
} from '../SynapticPathwaySelector';
import List from '../List';
import { accentColors } from '../../config';

const cssPrefix = 'synaptic-types-selector__';

interface SynapticTypesProps extends SynapticPathwaySelectProps {
  synapticTypes: string[];
  synapticTypesName: string;
  onPreTypeSelect: (string) => void;
  onPostTypeSelect: (string) => void;
  selectedPreType?: string;
  selectedPostType?: string;
}

const SynapticTypesSelector: React.FC<SynapticTypesProps> = ({
  synapticTypes,
  color,
  defaultActivePreLayer,
  onPreLayerSelected,
  defaultActivePostLayer,
  onPostLayerSelected,
  onPreTypeSelect,
  onPostTypeSelect,
  selectedPreType,
  selectedPostType,
  synapticTypesName,
}) => {
  return (
    <div className={`${cssPrefix}basis`}>
      <Selector title="2. Choose two layers" column>
        <SynapticPathwaySelector
          color={color}
          defaultActivePreLayer={defaultActivePreLayer}
          onPreLayerSelected={onPreLayerSelected}
          defaultActivePostLayer={defaultActivePostLayer}
          onPostLayerSelected={onPostLayerSelected}
        />
      </Selector>
      {(defaultActivePreLayer || defaultActivePostLayer) && (
        <p className="synaptic-types-header">
          3. Choose your {synapticTypesName}
        </p>
      )}
      <div className={`list-pre ${defaultActivePreLayer ? 'open' : ''}`}>
        <List
          title={`Presynaptic ${synapticTypesName}`}
          list={synapticTypes}
          defaultValue={selectedPreType}
          onSelect={onPreTypeSelect}
          color={color}
        />
      </div>
      <div className={`list-post ${defaultActivePostLayer ? 'open' : ''}`}>
        <List
          title={`Postsynaptic ${synapticTypesName}`}
          list={synapticTypes}
          defaultValue={selectedPostType}
          onSelect={onPostTypeSelect}
          color={accentColors.orange}
        />
      </div>
    </div>
  );
};

export default SynapticTypesSelector;
