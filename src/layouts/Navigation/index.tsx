import React, { ReactChild, ReactFragment } from 'react';
import './style.less';
import Brand from '../Brand';
import NavDesktop from '../NavDesktop';
import NavMobile from '../NavMobile';
import { NavLink } from 'react-router-dom';
import { accentColors } from '../../config';
import SvgRegions from '../../components/Icons/Regions';
import SvgNeuron from '../../components/Icons/Neuron';
import SvgMicrocircuit from '../../components/Icons/Microcircuit';
import SvgSynapse from '../../components/Icons/Synapse';
import { IoIosArrowDropdown } from 'react-icons/all';

const classPrefix = 'nav__';

export const HomeNav: React.FC = () => (
  <ul className="home-nav">
    <li>
      <NavLink to="/#about" exact>
        About
      </NavLink>
    </li>
    <li>
      <NavLink to="#" exact>
        Explore
      </NavLink>
    </li>
  </ul>
);

type NavProps = {
  initActive?: string;
  canClose?: boolean;
};

export const SecondaryNav: React.FC<NavProps> = ({ initActive, canClose }) => {
  const [active, setActive] = React.useState(initActive);

  const toggleSubmenu = name => {
    if (active !== name) {
      setActive(name);
    } else if (canClose) {
      setActive(undefined);
    }
  };

  return (
    <ul className="secondary-nav">
      <li className={active === 'exp' && 'active'}>
        <span style={{ backgroundColor: accentColors.yellow }} />
        <button onClick={() => toggleSubmenu('exp')}>
          Experimental Data{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.yellow }}>
          <li>
            <NavLink to="/experimental-data/layer-anatomy">
              <SvgRegions fill={accentColors.yellow} />
              Layer Anatomy
            </NavLink>
          </li>
          <li>
            <NavLink to="/experimental-data/neuron-morphology">
              <SvgNeuron fill={accentColors.yellow} />
              Neuron Morphology
            </NavLink>
          </li>
          <li>
            <NavLink to="/experimental-data/neuron-electrophysiology">
              <SvgNeuron fill={accentColors.yellow} />
              Neuron Electrophysiology
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={active === 'rec' && 'active'}>
        <span style={{ backgroundColor: accentColors.blue }} />
        <button onClick={() => toggleSubmenu('rec')}>
          Reconstruction Data{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.blue }}>
          <li>
            <NavLink to="/reconstruction-data/brain-regions">
              <SvgRegions fill={accentColors.blue} />
              Brain Regions
            </NavLink>
          </li>
          <li>
            <NavLink to="/reconstruction-data/microcircuit">
              <SvgMicrocircuit fill={accentColors.blue} />
              Microcircuit
            </NavLink>
          </li>
          <li>
            <NavLink to="/reconstruction-data/synaptic-pathways">
              <SvgSynapse fill={accentColors.blue} />
              Synaptic Pathways
            </NavLink>
          </li>
          <li>
            <NavLink to="/reconstruction-data/neurons">
              <SvgNeuron fill={accentColors.blue} />
              Neurons
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={active === 'dig' && 'active'}>
        <span style={{ backgroundColor: accentColors.lavender }} />
        <button onClick={() => toggleSubmenu('dig')}>
          Digital Reconstructions{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.lavender }}>
          <li>
            <NavLink to="/digital-reconstructions/brain-regions">
              <SvgRegions fill={accentColors.lavender} />
              Brain Regions
            </NavLink>
          </li>
          <li>
            <NavLink to="/digital-reconstructions/microcircuit">
              <SvgMicrocircuit fill={accentColors.lavender} />
              Microcircuit
            </NavLink>
          </li>
          <li>
            <NavLink to="/digital-reconstructions/synaptic-pathways">
              <SvgSynapse fill={accentColors.lavender} />
              Synaptic Pathways
            </NavLink>
          </li>
          <li>
            <NavLink to="/digital-reconstructions/neurons">
              <SvgNeuron fill={accentColors.lavender} />
              Neurons
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={active === 'val' && 'active'}>
        <span style={{ backgroundColor: accentColors.green }} />
        <button onClick={() => toggleSubmenu('val')}>
          Validations{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.green }}>
          <li>
            <NavLink to="/validations/brain-regions">
              <SvgRegions fill={accentColors.green} />
              Brain Regions
            </NavLink>
          </li>
          <li>
            <NavLink to="/validations/microcircuit">
              <SvgMicrocircuit fill={accentColors.green} />
              Microcircuit
            </NavLink>
          </li>
          <li>
            <NavLink to="/validations/synaptic-pathways">
              <SvgSynapse fill={accentColors.green} />
              Synaptic Pathways
            </NavLink>
          </li>
          <li>
            <NavLink to="/validations/neurons">
              <SvgNeuron fill={accentColors.green} />
              Neurons
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={active === 'pre' && 'active'}>
        <span style={{ backgroundColor: accentColors.grey }} />
        <button onClick={() => toggleSubmenu('pre')}>
          Predictions{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.grey }}>
          <li>
            <NavLink to="/predictions/brain-regions">
              <SvgRegions fill={accentColors.grey} />
              Brain Regions
            </NavLink>
          </li>
          <li>
            <NavLink to="/predictions/microcircuit">
              <SvgMicrocircuit fill={accentColors.grey} />
              Microcircuit
            </NavLink>
          </li>
          <li>
            <NavLink to="/predictions/synaptic-pathways">
              <SvgSynapse fill={accentColors.grey} />
              Synaptic Pathways
            </NavLink>
          </li>
          <li>
            <NavLink to="/predictions/neurons">
              <SvgNeuron fill={accentColors.grey} />
              Neurons
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  );
};

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
