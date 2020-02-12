import React from 'react';

import './style.less';
import Brand from '../Brand';
import NavDesktop from '../NavDesktop';
import NavMobile from '../NavMobile';
import { NavLink } from 'react-router-dom';

const classPrefix = 'nav__';

export const HomeNav: React.FC = () => (
  <ul className="home-nav">
    <li>
      <NavLink to="/" exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/#about" exact>
        About
      </NavLink>
    </li>
  </ul>
);

export const SecondaryNav: React.FC = () => (
  <ul className="secondary-nav">
    <li>
      <NavLink to="/experimental">Experimental Data</NavLink>
      <ul>
        <li>
          <NavLink to="/experimental/layer-anatomy">Layer Anatomy</NavLink>
        </li>
        <li>
          <NavLink to="/experimental/neuron-morphology">
            Neuron Morphology
          </NavLink>
        </li>
        <li>
          <NavLink to="/experimental/neuron-electrophysiology">
            Neuron Electrophysilogy
          </NavLink>
        </li>
      </ul>
    </li>
    <li>
      <NavLink to="/extrapolation">Extrapolation Data</NavLink>
      <ul>
        <li>
          <NavLink to="/extrapolation/brain-regions">Brain Regions</NavLink>
        </li>
        <li>
          <NavLink to="/extrapolation/layer-anatomy">Layer Anatomy</NavLink>
        </li>
        <li>
          <NavLink to="/extrapolation/synaptic-pathways">
            Synaptic Pathways
          </NavLink>
        </li>
        <li>
          <NavLink to="/extrapolation/microcircuits">Microcircuits</NavLink>
        </li>
      </ul>
    </li>
    <li>
      <NavLink to="/reconstruction">Reconstruction Data</NavLink>
      <ul>
        <li>
          <NavLink to="/reconstruction/brain-regions">Brain Regions</NavLink>
        </li>
        <li>
          <NavLink to="/reconstruction/layer-anatomy">Layer Anatomy</NavLink>
        </li>
        <li>
          <NavLink to="/reconstruction/synaptic-pathways">
            Synaptic Pathways
          </NavLink>
        </li>
        <li>
          <NavLink to="/reconstruction/microcircuits">Microcircuits</NavLink>
        </li>
      </ul>
    </li>
    <li>
      <NavLink to="/validation">Validation Data</NavLink>
      <ul>
        <li>
          <NavLink to="/validation/brain-regions">Brain Regions</NavLink>
        </li>
        <li>
          <NavLink to="/validation/layer-anatomy">Layer Anatomy</NavLink>
        </li>
        <li>
          <NavLink to="/validation/synaptic-pathways">
            Synaptic Pathways
          </NavLink>
        </li>
        <li>
          <NavLink to="/validation/microcircuits">Microcircuits</NavLink>
        </li>
      </ul>
    </li>
    <li>
      <NavLink to="/prediction">Predictions</NavLink>
      <ul>
        <li>
          <NavLink to="/prediction/brain-regions">Brain Regions</NavLink>
        </li>
        <li>
          <NavLink to="/prediction/layer-anatomy">Layer Anatomy</NavLink>
        </li>
        <li>
          <NavLink to="/prediction/synaptic-pathways">
            Synaptic Pathways
          </NavLink>
        </li>
        <li>
          <NavLink to="/prediction/microcircuits">Microcircuits</NavLink>
        </li>
      </ul>
    </li>
  </ul>
);

const Navigation: React.FC = () => {
  return (
    <div role="navigation" className={`${classPrefix}basis`}>
      <Brand />
      <NavDesktop />
      <NavMobile />
    </div>
  );
};

export default Navigation;
