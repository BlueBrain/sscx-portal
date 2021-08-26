import React from 'react';
import Link from 'next/link';
import { FaTwitterSquare, FaLinkedin, FaYoutubeSquare } from 'react-icons/fa';

import styles from './styles.module.scss';


const link = {
  bbpPortal: 'https://www.epfl.ch/research/domains/bluebrain/',
  privacyPolicy: 'https://www.epfl.ch/about/presidency/presidents-team/legal-affairs/epfl-privacy-policy/',
  disclaimer: 'https://www.epfl.ch/about/overview/regulations-and-guidelines/disclaimer/',
  cookies: 'https://www.epfl.ch/about/presidency/presidents-team/legal-affairs/epfl-privacy-policy/cookies-policy/',
  twitter: 'https://www.google.com/url?q=https://twitter.com/bluebrainpjt?lang%3Den&sa=D&source=editors&ust=1621257818134000&usg=AOvVaw2R-KvpkcjrsGpHzAJQWB9p',
  linkedin: 'https://www.google.com/url?q=https://www.linkedin.com/showcase/blue-brain-project/&sa=D&source=editors&ust=1621257818134000&usg=AOvVaw01DeXZO0Rs5eUtuvBawWzI',
  youtube: 'https://www.google.com/url?q=https://www.youtube.com/user/Bluebrainpjt/featured&sa=D&source=editors&ust=1621257818134000&usg=AOvVaw36Av7NQPlVH1juztZbzxCh',
};

const openNewTab = {
  target: '_blank',
  rel: 'noreferrer',
};


const Footer: React.FC<{}> = () => {
  const minYear = 2021;
  const userYear = new Date().getFullYear();

  const displayYear = userYear > minYear
    ? userYear
    : minYear;

  return (
    <footer className={styles.container}>
      <h2 className="mb-2">The Somatosensory Cortex Portal</h2>
      <div className={styles.row}>
        <div className="mt-2">
          <p><a href={link.bbpPortal} {...openNewTab}>Blue Brain Project</a></p>
          <p className={styles.address}>
            EPFL/Campus Biotech <br/>
            Chemin des Mines 9 <br/>
            CH-1202 Geneva <br/>
            Switzerland <br/>
          </p>
        </div>

        <div className="mt-2">
          <p><Link href="/terms-of-use/">Terms of Use</Link></p>
          <p><a href={link.privacyPolicy} {...openNewTab}>Privacy Policy</a></p>
          <p><a href={link.disclaimer} {...openNewTab}>Disclaimer</a></p>
          <p><a href={link.cookies} {...openNewTab}>Cookies</a></p>
        </div>

        <div className="mt-2">
          <p><Link href="/">Home</Link></p>
          <p><Link href="/#about">About</Link></p>
          <p><Link href="/#explore">Explore</Link></p>
          <p><Link href="/#publications">Publications</Link></p>
          <p><Link href="/glossary">Glossary</Link></p>
          <p><Link href="/#contact">Contact us</Link></p>
          <div className="mt-3">
            <span>Follow the Blue Brain</span>

            <div className={styles.socialLinks}>
              <a href={link.twitter} {...openNewTab}><FaTwitterSquare /></a>
              <a href={link.linkedin} {...openNewTab}><FaLinkedin /></a>
              <a href={link.youtube} {...openNewTab}><FaYoutubeSquare /></a>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4">©Blue Brain Project/EPFL 2005-{displayYear}</p>
    </footer>
  );
};

export default Footer;
