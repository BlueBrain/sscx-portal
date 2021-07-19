import React from 'react';
import Brand from '../Brand';
import NavDesktop from '../NavDesktop';
import NavMobile from '../NavMobile';
import Link from 'next/link';
import { accentColors } from '../../config';
import SvgRegions from '../../components/Icons/Regions';
import SvgNeuron from '../../components/Icons/Neuron';
import SvgMicrocircuit from '../../components/Icons/Microcircuit';
import SvgSynapse from '../../components/Icons/Synapse';
import { IoIosArrowDropdown } from 'react-icons/io';


const classPrefix = 'nav__';

export const HomeNav: React.FC = () => (
  <ul className="home-nav">
    <li>
      <Link href="/about">
        About
      </Link>
    </li>
    <li>
      <Link href="/#explore">
        Explore
      </Link>
    </li>
  </ul>
);

type NavProps = {
  initActive?: string;
  canClose?: boolean;
};

export const SecondaryNav: React.FC<NavProps> = ({ initActive, canClose }) => {
  const [active, setActive] = React.useState(initActive);

  const toggleSubmenu = (name: string) => {
    if (active !== name) {
      setActive(name);
    } else if (canClose) {
      setActive(undefined);
    }
  };

  return (
    <ul className="secondary-nav">
      <li className={active === 'exp' ? 'active' : ''}>
        <span style={{ backgroundColor: accentColors.yellow }} />
        <button onClick={() => toggleSubmenu('exp')}>
          Experimental Data{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.yellow }}>
          <li>
            <Link href="/experimental-data/layer-anatomy">
              <a>
                <SvgRegions fill={accentColors.yellow} />
                Layer Anatomy
              </a>
            </Link>
          </li>
          <li>
            <Link href="/experimental-data/neuron-morphology">
              <a>
                <SvgNeuron fill={accentColors.yellow} />
                Neuron Morphology
              </a>
            </Link>
          </li>
          <li>
            <Link href="/experimental-data/neuron-electrophysiology">
              <a>
                <SvgNeuron fill={accentColors.yellow} />
                Neuron Electrophysiology
              </a>
            </Link>
          </li>
        </ul>
      </li>
      <li className={active === 'rec' ? 'active' : undefined}>
        <span style={{ backgroundColor: accentColors.blue }} />
        <button onClick={() => toggleSubmenu('rec')}>
          Reconstruction Data{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.blue }}>
          <li>
            <Link href="/reconstruction-data/brain-regions">
              <a>
                <SvgRegions fill={accentColors.blue} />
                Brain Regions
              </a>
            </Link>
          </li>
          <li>
            <Link href="/reconstruction-data/microcircuit">
              <a>
                <SvgMicrocircuit fill={accentColors.blue} />
                Microcircuit
              </a>
            </Link>
          </li>
          <li>
            <Link href="/reconstruction-data/synaptic-pathways">
              <a>
                <SvgSynapse fill={accentColors.blue} />
                Synaptic Pathways
              </a>
            </Link>
          </li>
          <li>
            <Link href="/reconstruction-data/neurons">
              <a>
                <SvgNeuron fill={accentColors.blue} />
                Neurons
              </a>
            </Link>
          </li>
        </ul>
      </li>
      <li className={active === 'dig' ? 'active' : undefined}>
        <span style={{ backgroundColor: accentColors.lavender }} />
        <button onClick={() => toggleSubmenu('dig')}>
          Digital Reconstructions{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.lavender }}>
          <li>
            <Link href="/digital-reconstructions/brain-regions">
              <a>
                <SvgRegions fill={accentColors.lavender} />
                Brain Regions
              </a>
            </Link>
          </li>
          <li>
            <Link href="/digital-reconstructions/microcircuit">
              <a>
                <SvgMicrocircuit fill={accentColors.lavender} />
                Microcircuit
              </a>
            </Link>
          </li>
          <li>
            <Link href="/digital-reconstructions/synaptic-pathways">
              <a>
                <SvgSynapse fill={accentColors.lavender} />
                Synaptic Pathways
              </a>
            </Link>
          </li>
          <li>
            <Link href="/digital-reconstructions/neurons">
              <a>
                <SvgNeuron fill={accentColors.lavender} />
                Neurons
              </a>
            </Link>
          </li>
        </ul>
      </li>
      <li className={active === 'val' ? 'active' : undefined}>
        <span style={{ backgroundColor: accentColors.green }} />
        <button onClick={() => toggleSubmenu('val')}>
          Validations{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.green }}>
          <li>
            <Link href="/validations/brain-regions">
              <a>
                <SvgRegions fill={accentColors.green} />
                Brain Regions
              </a>
            </Link>
          </li>
          <li>
            <Link href="/validations/microcircuit">
              <a>
                <SvgMicrocircuit fill={accentColors.green} />
                Microcircuit
              </a>
            </Link>
          </li>
          <li>
            <Link href="/validations/synaptic-pathways">
              <a>
                <SvgSynapse fill={accentColors.green} />
                Synaptic Pathways
              </a>
            </Link>
          </li>
          <li>
            <Link href="/validations/neurons">
              <a>
                <SvgNeuron fill={accentColors.green} />
                Neurons
              </a>
            </Link>
          </li>
        </ul>
      </li>
      <li className={active === 'pre' ? 'active' : undefined}>
        <span style={{ backgroundColor: accentColors.grey }} />
        <button onClick={() => toggleSubmenu('pre')}>
          Predictions{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.grey }}>
          <li>
            <Link href="/predictions/brain-regions">
              <a>
                <SvgRegions fill={accentColors.grey} />
                Brain Regions
              </a>
            </Link>
          </li>
          <li>
            <Link href="/predictions/microcircuit">
              <a>
                <SvgMicrocircuit fill={accentColors.grey} />
                Microcircuit
              </a>
            </Link>
          </li>
          <li>
            <Link href="/predictions/synaptic-pathways">
              <a>
                <SvgSynapse fill={accentColors.grey} />
                Synaptic Pathways
              </a>
            </Link>
          </li>
          <li>
            <Link href="/predictions/neurons">
              <a>
                <SvgNeuron fill={accentColors.grey} />
                Neurons
              </a>
            </Link>
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
