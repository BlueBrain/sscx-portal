import React from 'react';

import './style.less';
import { NavLink, withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import { SecondaryNav } from '../Navigation';

const classPrefix = 'nav-desktop__';
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
  return (
    <NavLink to={path} exact={home}>
      <Button
        palette={palette}
        width={highlight || home ? 140 : null}
        discrete={!highlight && !home}
        onClick={onClick}
        notifications={notifications}
      >
        {name}
      </Button>
    </NavLink>
  );
};

const NavDesktop = withRouter(({ location }) => {
  const [secondaryNav, setSecondaryNav] = React.useState(false);
  React.useEffect(() => setSecondaryNav(false), [location]);

  return (
    <ul className={`${classPrefix}basis`}>
      <li style={{ position: 'relative' }}>
        {secondaryNav ? (
          <NavButton path="/" name="Home" home />
        ) : (
          <Button
            width={140}
            palette={palette}
            active={location.pathname === '/'}
            onClick={() => setSecondaryNav(true)}
          >
            Home
          </Button>
        )}
        {secondaryNav && <SecondaryNav />}
      </li>
      <li>
        <NavButton
          path="/downloads"
          name="Downloads"
          notifications={7}
          highlight
        />
      </li>
      <li>
        <NavButton path="/literature" name="Literature" />
      </li>
      <li>
        <NavButton path="/styleguide" name="Styleguide" />
      </li>
    </ul>
  );
});

export default NavDesktop;
