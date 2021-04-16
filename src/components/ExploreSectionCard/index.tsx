import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { basePath } from '../../config';
import { LayerSvg, MicrocircuitSvg, PathwaySvg, NeuronSvg } from '../Icons';

import styles from './styles.module.scss';


type IconType = 'layer' | 'microcircuit' | 'pathway' | 'neuron';

type ExploreSectionCardProps = {
  title: string | ReactNode;
  description?: string | ReactNode;
  image?: string;
  bgColor?: string;
  links: {
    label: string;
    href?: string;
    icon?: IconType;
  }[];
};

const icons = {
  layer: LayerSvg,
  microcircuit: MicrocircuitSvg,
  pathway: PathwaySvg,
  neuron: NeuronSvg,
};

const IconSvg: React.FC<{ icon: IconType }> = ({ icon }) => {

  switch (icon) {
    case 'layer': return <LayerSvg />;
    case 'microcircuit': return <MicrocircuitSvg />;
    case 'pathway': return <PathwaySvg />;
    case 'neuron': return <NeuronSvg />;
  }
};

const ExploreSectionCard: React.FC<ExploreSectionCardProps> = ({
  title,
  description,
  image,
  bgColor,
  links,
}) => {
  const [infoOpened, setInfoOpened] = useState(false);

  return (
    <div
      className={`${styles.container} ${infoOpened ? 'show' : ''}`}
      style={{ backgroundColor: `var(--color-${bgColor})` }}
    >
      <div
        className={styles.head}
        style={{ backgroundColor: `var(--color-${bgColor}-darker)` }}
      >
        <div className={styles.headInner}>
          <img
            src={`${basePath}/assets/images/pipeline/${image}.svg`}
            alt={`${image} pipeline`}
          />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.titleBar}></div>
          <h3 className="text-white text-uppercase">{title}</h3>
        </div>

        <div>
          {links.map(link => link.href ? (
            <Link key={link.label} href={link.href}>
              <a className={styles.link}>
                {link.icon && <IconSvg icon={link.icon}/>}
                {link.label}
              </a>
            </Link>
          ) : (
            <p key={link.label} className={`${styles.link} ${styles.disabledLink}`}>
              {link.icon && icons[link.icon]}
              {link.label}<sup>*</sup>
            </p>
          ))}
        </div>

        <div
          className={styles.infoBtn}
          onClick={() => setInfoOpened(!infoOpened)}
        >
          {infoOpened ? (<FaMinus size={14}/>) : (<FaPlus size={14}/>)}
        </div>

        <div className={styles.info}>
          {description}
        </div>
        <div className={styles.infoBottomGradient}></div>
      </div>
    </div>
  );
};

export default ExploreSectionCard;
