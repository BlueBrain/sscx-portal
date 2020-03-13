import React, { ReactChild, ReactFragment } from 'react';
import './style.less';
import {FaCircle} from 'react-icons/all';

const classPrefix = 'info-box-1__';

type InfoBox1Props = {
  title: string;
  teaser: string;
  children: ReactChild | ReactFragment;
};

const InfoBox1: React.FC<InfoBox1Props> = ({
                                             title,
                                             teaser,
                                             children,
                                           }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className={`${classPrefix}basis`}>
      <img src={require('../../../assets/images/icons/checkmark.svg')} alt='checkmark'/>
      <h3>{title}</h3>
      <p>{teaser}</p>
      <span onClick={() => setExpanded(!expanded)}>
        <FaCircle /> Read {expanded ? 'less' : 'more'}
      </span>
      <div className={`more ${expanded ? 'open' : ''}`}>{children}</div>
    </div>
  );
};

export default InfoBox1;
