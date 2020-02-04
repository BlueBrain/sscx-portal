import React, { ReactChild, ReactFragment } from 'react';

import './style.less';

const classPrefix = 'collapsable__';

type CollapsableProps = {
  collapsed?: boolean;
  children: ReactChild | ReactFragment;
};

const Collapsable: React.FC<CollapsableProps> = ({ collapsed }) => {

  return (

  );
};

export default Collapsable;
