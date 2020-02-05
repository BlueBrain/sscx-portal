import React from 'react';
import EpflLogo from '../../assets/images/epfl-logo.svg';

import './style.less';
import { NavLink } from 'react-router-dom';
import { Layer } from '../../components/LayerAnatomySelector';
import Button from '../../components/Button';

const classPrefix = 'nav__';
const palette = 'cool';

type NavButtonProps = {
  path: string;
  name: string;
  notifications?: number;
  home?: boolean;
  highlight?: boolean;
  onClick?: () => void;
};

const NavButton: React.FC<NavButtonProps> = ({
                                               path,
                                               name,
                                               notifications,
                                               home,
                                               highlight,
                                               onClick,
                                             }) => {
  return <NavLink to={path} activeClassName="active" exact={home}>
    <Button palette={palette} discrete={!highlight && !home} onClick={onClick}
            notifications={notifications}>{name}</Button>
  </NavLink>;
};

const SecondaryNav: React.FC = () => <ul>
  <li>
    <NavLink to="/experimental" activeClassName="selected">
      Experiments
    </NavLink>
  </li>
  <li>
    <NavLink to="/reconstruction" activeClassName="selected">
      Reconstruction
    </NavLink>
  </li>
  <li>
    <NavLink to="/validation" activeClassName="selected">
      Validation
    </NavLink>
  </li>
  <li>
    <NavLink to="/validation" activeClassName="selected">
      Predictions
    </NavLink>
  </li>
</ul>;

const Navigation: React.FC = () => {
  const [secondaryNav, setSecondaryNav] = React.useState(false);

  return <div role="navigation" className={`${classPrefix}basis`}>
    <ul>
      <li>
        <NavButton path='/' name='Home' home onClick={() => setSecondaryNav(!secondaryNav)}/>
        {secondaryNav && <SecondaryNav/>}
      </li>
      <li>
        <NavButton path='/experimental' name='Downloads' highlight/>
      </li>
      <li>
        <NavButton path='/reconstruction' name='Litterature'/>
      </li>
      <li>
        <NavButton path='/styleguide' name='Styleguide'/>
      </li>
    </ul>
  </div>;
};

export default Navigation;
