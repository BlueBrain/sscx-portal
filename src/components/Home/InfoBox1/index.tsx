import React, { ReactChild, ReactFragment } from 'react';

import { basePath } from '../../../config';


const classPrefix = 'info-box-1__';

type InfoBox1Props = {
  icon: 'checkmark' | 'mail' | 'search' | 'download';
  title: string;
  children: ReactChild | ReactFragment;
};

const InfoBox1: React.FC<InfoBox1Props> = ({
  icon,
  title,
  children,
}) => (
  <div className={`${classPrefix}basis`}>
    {icon === 'checkmark' && (
      <img
        src={`${basePath}/assets/images/icons/checkmark.svg`}
        alt="checkmark"
      />
    )}
    {icon === 'mail' && (
      <img
        src={`${basePath}/assets/images/icons/mail.svg`}
        alt="mail"
      />
    )}
    {icon === 'search' && (
      <img
        src={`${basePath}/assets/images/icons/search.svg`}
        alt="search"
      />
    )}
    {icon === 'download' && (
      <img
        src={`${basePath}/assets/images/icons/download.svg`}
        alt="download"
      />
    )}
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

export default InfoBox1;
