import React from 'react';
import { withRouter } from 'react-router-dom';
import { MdClose, IoMdMenu } from 'react-icons/all';

import { SecondaryNav, HomeNav } from '../Navigation';

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
