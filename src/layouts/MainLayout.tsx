import React from 'react';
import { NavLink } from 'react-router-dom';

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <div role="navigation">
        <ul>
          <li>
            <NavLink to="/" activeClassName="selected" exact={true}>
              Home
            </NavLink>
          </li>
          <li>
            <ul>
              <li>
                <NavLink to="/experimental" activeClassName="selected">
                  Experiments
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <NavLink to="/reconstruction" activeClassName="selected">
                  Reconstruction
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <NavLink to="/validation" activeClassName="selected">
                  Validation
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <NavLink to="/styleguide" activeClassName="selected">
                  Styleguide
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
};

export default MainLayout;
