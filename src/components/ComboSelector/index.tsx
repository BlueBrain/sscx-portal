import React from 'react';

import './style.less';
import Selector from '../Selector';
import List from '../List';
import { Color } from '../../types';

const cssPrefix = 'combo-selector__';

export type ComboSelectorProps = {
  selector: React.ReactNode;
  list1: React.ReactNode;
  list2: React.ReactNode;
  selectorTitle?: string;
  listsTitle?: string;
  list1Open?: boolean;
  list2Open?: boolean;
};

const ComboSelector: React.FC<ComboSelectorProps> = ({
  selector,
  list1,
  list2,
  selectorTitle = '',
  listsTitle = '',
  list1Open = true,
  list2Open = true,
}) => {
  return (
    <div className={`${cssPrefix}basis`}>
      <Selector title={selectorTitle} column>
        {selector}
      </Selector>
      {(list1Open || list2Open) && (
        <p className="combo-boxes-header">{listsTitle}</p>
      )}
      <div className={`list-1 ${list1Open ? 'open' : ''}`}>{list1}</div>
      <div className={`list-2 ${list2Open ? 'open' : ''}`}>{list2}</div>
    </div>
  );
};

export default ComboSelector;
