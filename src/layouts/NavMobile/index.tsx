import React from 'react';

import './style.less';
import { NavLink, withRouter } from 'react-router-dom';
import { IoIosMenu, MdClose } from 'react-icons/all';

const classPrefix = 'nav-mobile__';

type MenuProps = {
  open?: boolean;
  onClose: () => void;
};

const Menu: React.FC<MenuProps> = ({ open, onClose }) => <div className={`${classPrefix}menu ${open ? 'open' : ''}`} onClick={onClose}>
  <div className='menu' onClick={e => e.stopPropagation()}>
    <div className='close-icon' onClick={onClose}><MdClose /></div>
    <ul>
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
      <li>
        <NavLink to="/styleguide" activeClassName="selected">
          Styleguide
        </NavLink>
      </li>
    </ul>
  </div>
</div>;

const NavMobile = withRouter(({ location }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(false), [location]);

  return <>
    <div className={`${classPrefix}basis`}>
      <div className={`menu-icon ${open ? 'open' : ''}`} onClick={() => setOpen(true)}>
        <IoIosMenu/>
      </div>
      <ul>
        <li>
          <NavLink to="/experimental" activeClassName="active">
            Validation
          </NavLink>
        </li>
        <li>
          <NavLink to="/reconstruction" activeClassName="active">
            Reconstruction
          </NavLink>
        </li>
        <li>
          <NavLink to="/styleguide" activeClassName="active">
            Styleguide
          </NavLink>
        </li>
      </ul>
    </div>
    <Menu onClose={() => setOpen(false)} open={open}/>
  </>;
});

export default NavMobile;
