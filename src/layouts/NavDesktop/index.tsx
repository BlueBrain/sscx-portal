import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../components/Button';
import { HomeNav, SecondaryNav } from '../Navigation';
import { State } from '../../store';

import './style.less';

const classPrefix = 'nav-desktop__';

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
        width={highlight || home ? 140 : null}
        discrete={!highlight && !home}
        onClick={onClick}
        notifications={notifications}
        uppercase
      >
        {name}
      </Button>
    </NavLink>
  );
};

const NavDesktop = withRouter(({ location }) => {
  const [secondaryNav, setSecondaryNav] = React.useState(false);
  React.useEffect(() => setSecondaryNav(false), [location]);
  const downloadItems = useSelector<State, number>(
    state => state.download.items.length,
  );

  return (
    <ul className={`${classPrefix}basis`}>
      <li style={{ position: 'relative' }}>
        {secondaryNav ? (
          <NavButton path="/" name="Home" home />
        ) : (
          <Button
            width={140}
            active={location.pathname === '/'}
            onClick={() => setSecondaryNav(true)}
            uppercase
          >
            Home
          </Button>
        )}
        {secondaryNav && (
          <div className="flyout">
            <HomeNav />
            <SecondaryNav initActive="exp" />
          </div>
        )}
      </li>
      <li>
        <NavButton
          path="/downloads"
          name="Download"
          notifications={downloadItems > 0 ? downloadItems : undefined}
          highlight
        />
      </li>
      <li>
        <NavButton path="/glossary" name="Glossary" />
      </li>
      <li>
        <NavButton
          path="/contact-and-submission"
          name="Contact and Submission"
        />
      </li>
      <li>
        <NavButton path="/styleguide" name="Styleguide" />
      </li>
    </ul>
  );
});

export default NavDesktop;
