import React, { ReactChild, ReactFragment } from 'react';
import './style.less';
import { FaCircle, FaCaretDown } from 'react-icons/all';
import { Color } from '../../../types';

const classPrefix = 'info-box-2__';

type InfoBox2Props = {
  title: string;
  color: Color;
  children: ReactChild | ReactFragment;
  arrow?: boolean;
};

const InfoBox2: React.FC<InfoBox2Props> = ({
  title,
  color,
  children,
  arrow,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className={`${classPrefix}basis ${color} ${expanded ? 'open' : ''}`}>
      <div className="dataset-container">
        <div className="dataset">
          <h3 dangerouslySetInnerHTML={{ __html: title }} />
          <span onClick={() => setExpanded(!expanded)}>
            Read {expanded ? 'less' : 'more'}
            <FaCircle />
          </span>
          {arrow && (
            <div className="caret-1">
              <FaCaretDown />
            </div>
          )}
        </div>
        <ul className="links">
          <li style={{ width: '100%' }}>
            <img
              src={require('../../../assets/images/icons/regions.svg')}
              alt="brain regions"
            />
            Sub-regions
          </li>
          <li style={{ width: '90%' }}>
            <img
              src={require('../../../assets/images/icons/synapse.svg')}
              alt="synapse"
            />
            Synaptic Pathways
          </li>
          <li style={{ width: '85%' }}>
            <img
              src={require('../../../assets/images/icons/neuron.svg')}
              alt="neuron"
            />
            Neurons
          </li>
          {title !== 'Experimental data' && (
            <li style={{ width: '95%' }}>
              <img
                src={require('../../../assets/images/icons/microcircuit.svg')}
                alt="microcircuit"
              />
              Microcircuits
            </li>
          )}
        </ul>
      </div>
      <div className="more">
        <div className="more-content">{children}</div>
        <div className="more-shadow" />
      </div>
      {arrow && (
        <div className="caret-2">
          <FaCaretDown />
        </div>
      )}
      {arrow && (
        <div className="caret-3">
          <FaCaretDown />
        </div>
      )}
    </div>
  );
};

export default InfoBox2;
