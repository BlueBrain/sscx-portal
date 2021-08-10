import React, { useRef } from 'react';
import Brand from '../Brand';
import NavDesktop from '../NavDesktop';
import NavMobile from '../NavMobile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { accentColors, basePath } from '../../config';
import SvgRegions from '../../components/Icons/Regions';
import SvgNeuron from '../../components/Icons/Neuron';
import SvgMicrocircuit from '../../components/Icons/Microcircuit';
import SvgSynapse from '../../components/Icons/Synapse';
import { IoIosArrowDropdown } from 'react-icons/io';


const classPrefix = 'nav__';

export const HomeNav: React.FC = () => (
  <ul className="home-nav">
    <li>
      <Link href="/#about">
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
  mobile?: boolean;
};

const secondaryMenuSubPaths = [
  'experimetal-data',
  'reconstruction-datan',
  'digital-reconstructions',
  'validations',
  'predictions',
];

export const SecondaryNav: React.FC<NavProps> = ({ mobile }) => {
  const router = useRouter();
  const menuContainerRef = useRef<HTMLUListElement>(null);

  const subPath = router.asPath.replace(basePath, '').split('/').filter(Boolean)[0];
  const activeNavGroup = secondaryMenuSubPaths.includes(subPath)
    ? subPath
    : 'experimental-data';

  const [active, setActive] = React.useState(activeNavGroup);

  const current  = mobile ? active : activeNavGroup;

  const toggleSubmenu = (name: string) => {
    if (!mobile) return;

    setActive(active !== name ? name : null);
  };

  // TODO: find better way to hide the menu when user clicks on a link (than full page rerender)

  return (
    <ul className="secondary-nav" ref={menuContainerRef}>
      <li className={current === 'experimental-data' ? 'active' : ''}>
        <span style={{ backgroundColor: accentColors.yellow }} />
        <button onClick={() => toggleSubmenu('experimental-data')}>
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
      <li className={current === 'reconstruction-data' ? 'active' : undefined}>
        <span style={{ backgroundColor: accentColors.blue }} />
        <button onClick={() => toggleSubmenu('reconstruction-data')}>
          Reconstruction Data{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.blue }}>
          <li>
            {/* <Link> */}
              <a className="disabled">
                <SvgRegions fill={accentColors.blue} />
                Brain Regions <sup>*</sup>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/reconstruction-data/microcircuit"> */}
              <a className="disabled">
                <SvgMicrocircuit fill={accentColors.blue} />
                Microcircuit <sup>*</sup>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/reconstruction-data/synaptic-pathways"> */}
              <a className="disabled">
                <SvgSynapse fill={accentColors.blue} />
                <span>Synaptic Pathways<sup>*</sup></span>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/reconstruction-data/neurons"> */}
              <a className="disabled">
                <SvgNeuron fill={accentColors.blue} />
                Neurons <sup>*</sup>
              </a>
            {/* </Link> */}
          </li>
        </ul>
      </li>
      <li className={current === 'digital-reconstructions' ? 'active' : undefined}>
        <span style={{ backgroundColor: accentColors.lavender }} />
        <button onClick={() => toggleSubmenu('digital-reconstructions')}>
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
      <li className={current === 'validations' ? 'active' : undefined}>
        <span style={{ backgroundColor: accentColors.green }} />
        <button onClick={() => toggleSubmenu('validations')}>
          Validations{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.green }}>
          <li>
            {/* <Link href="/validations/brain-regions"> */}
              <a className="disabled">
                <SvgRegions fill={accentColors.green} />
                Brain Regions <sup>*</sup>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/validations/microcircuit"> */}
              <a className="disabled">
                <SvgMicrocircuit fill={accentColors.green} />
                Microcircuit <sup>*</sup>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/validations/synaptic-pathways"> */}
              <a className="disabled">
                <SvgSynapse fill={accentColors.green} />
                <span>Synaptic Pathways<sup>*</sup></span>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/validations/neurons"> */}
              <a className="disabled">
                <SvgNeuron fill={accentColors.green} />
                Neurons <sup>*</sup>
              </a>
            {/* </Link> */}
          </li>
        </ul>
      </li>
      <li className={current === 'predictions' ? 'active' : undefined}>
        <span style={{ backgroundColor: accentColors.grey }} />
        <button onClick={() => toggleSubmenu('predictions')}>
          Predictions{' '}
          <span className="show-mobile">
            <IoIosArrowDropdown />
          </span>
        </button>
        <ul style={{ borderLeftColor: accentColors.grey }}>
          <li>
            {/* <Link href="/predictions/brain-regions"> */}
              <a className="disabled">
                <SvgRegions fill={accentColors.grey} />
                Brain Regions <sup>*</sup>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/predictions/microcircuit"> */}
              <a className="disabled">
                <SvgMicrocircuit fill={accentColors.grey} />
                Microcircuit <sup>*</sup>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/predictions/synaptic-pathways"> */}
              <a className="disabled">
                <SvgSynapse fill={accentColors.grey} />
                <span>Synaptic Pathways<sup>*</sup></span>
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/predictions/neurons"> */}
              <a className="disabled">
                <SvgNeuron fill={accentColors.grey} />
                Neurons <sup>*</sup>
              </a>
            {/* </Link> */}
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
