import React from 'react';

import './style.less';
import { NavLink, withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import Brand from '../Brand';

const classPrefix = 'nav__';
const palette = 'cool';

type NavButtonProps = {
  path: string;
  name: string;
  notifications?: number;
  home?: boolean;
  highlight?: boolean;
  onClick?: (any) => void;
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
    <Button palette={palette}
            width={highlight || home ? 140 : null}
            discrete={!highlight && !home}
            onClick={onClick}
            notifications={notifications}>
      {name}
    </Button>
  </NavLink>;
};

const SecondaryNav: React.FC = () => <ul className='secondary-nav'>
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

const Navigation = withRouter(({ location }) => {
  const [secondaryNav, setSecondaryNav] = React.useState(false);
  const hideSecondaryNav = () => setSecondaryNav(false);

  return <div role="navigation" className={`${classPrefix}basis`}>
    <Brand />
    <ul>
      <li style={{ position: 'relative' }}>
        {secondaryNav ?
          <NavButton path='/' name='Home' home onClick={hideSecondaryNav} /> :
          <Button width={140} palette={palette} active={location.pathname === '/'} onClick={() => setSecondaryNav(true)}>Home</Button>}
        {secondaryNav && <SecondaryNav/>}
      </li>
      <li>
        <NavButton path='/experimental' name='Downloads' highlight onClick={hideSecondaryNav} />
      </li>
      <li>
        <NavButton path='/reconstruction' name='Litterature' onClick={hideSecondaryNav} />
      </li>
      <li>
        <NavButton path='/styleguide' name='Styleguide' onClick={hideSecondaryNav}/>
      </li>
    </ul>
  </div>;
});

export default Navigation;
