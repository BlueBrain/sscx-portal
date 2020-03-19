import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { IoIosMenu, MdClose } from 'react-icons/all';
import { useSelector } from 'react-redux';

import { SecondaryNav, HomeNav } from '../Navigation';
import { State } from '../../store';

import './style.less';

const classPrefix = 'nav-mobile__';

type MenuProps = {
  open?: boolean;
  onClose: () => void;
};

const Menu: React.FC<MenuProps> = ({ open, onClose }) => (
  <div className={`${classPrefix}menu ${open ? 'open' : ''}`} onClick={onClose}>
    <div className="menu" onClick={e => e.stopPropagation()}>
      <div className="close-icon" onClick={onClose}>
        <MdClose />
      </div>
      <HomeNav />
      <SecondaryNav />
    </div>
  </div>
);

const NavMobile = withRouter(({ location }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(false), [location]);
  const downloadItems = useSelector<State, number>(
    state => state.download.items.length,
  );

  return (
    <>
      <div className={`${classPrefix}basis`}>
        <div
          className={`menu-icon ${open ? 'open' : ''}`}
          onClick={() => setOpen(true)}
        >
          <IoIosMenu />
        </div>
        <ul>
          <li>
            <NavLink to="/downloads" activeClassName="active">
              Downloads{downloadItems > 0 && ` (${downloadItems})`}
            </NavLink>
          </li>
          <li>
            <NavLink to="/literature" activeClassName="active">
              Literature
            </NavLink>
          </li>
          <li>
            <NavLink to="/styleguide" activeClassName="active">
              Styleguide
            </NavLink>
          </li>
        </ul>
      </div>
      <Menu onClose={() => setOpen(false)} open={open} />
    </>
  );
});

export default NavMobile;
