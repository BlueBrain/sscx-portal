import React from 'react';

import ScrollTo from '../../components/ScrollTo';
import { Color } from '../../types';
import styles from './styles.module.scss';


type FiltersProps = {
  primaryColor: Color;
  hasData?: boolean;
  id?: string;
};

const Filters: React.FC<FiltersProps> = ({
  primaryColor,
  children,
  hasData,
  id = 'filters',
}) => {
  return (
    <div>
      <div id={id} className={styles.container}>
        <div className="center">{children}</div>
      </div>
      {!!hasData && (
        <div className="scroll-to">
          <ScrollTo
            anchor="data"
            color={primaryColor}
            direction="down"
          >
            View data
          </ScrollTo>
        </div>
      )}
    </div>
  );
};


export default Filters;
