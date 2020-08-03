import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { MdClose, IoMdMenu } from 'react-icons/all';

import { SecondaryNav } from '../Navigation';

import './style.less';
import Search from '../../components/Search';

const classPrefix = 'nav-mobile__';

type MenuProps = {
  open?: boolean;
  onClose: () => void;
};

const Menu: React.FC<MenuProps> = ({ open, onClose }) => (
  <div className={`${classPrefix}menu ${open ? 'open' : ''}`}>
    <div className="close-icon" onClick={onClose}>
      <MdClose />
    </div>
    <div className="top-links">
      <NavLink to="/">
        <img
          src={require('url:../../assets/images/icons/home.svg')}
          alt="home"
        />
        <span>Home</span>
      </NavLink>
      <NavLink to="#">
        <img
          src={require('url:../../assets/images/icons/globe.svg')}
          alt="globe"
        />
        <span>Glossary</span>
      </NavLink>
      <NavLink to="#">
        <img
          src={require('url:../../assets/images/icons/mail-alt.svg')}
          alt="mail"
        />
        <span>Contact</span>
      </NavLink>
      <NavLink to="/downloads">
        <img
          src={require('url:../../assets/images/icons/download-alt.svg')}
          alt="download"
        />
        <span>Download</span>
      </NavLink>
    </div>
    <SecondaryNav canClose />
    <div className="menu-search">
      <Search />
    </div>
  </div>
);

const NavMobile = withRouter(({ location }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(false), [location]);

  return (
    <>
      <div className={`${classPrefix}basis`} onClick={() => setOpen(true)}>
        <IoMdMenu />
      </div>
      <Menu onClose={() => setOpen(false)} open={open} />
    </>
  );
});

export default NavMobile;
