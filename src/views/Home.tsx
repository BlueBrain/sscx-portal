import './Home.less';
import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import InfoBox1 from '../components/Home/InfoBox1';
import InfoBox2 from '../components/Home/InfoBox2';
import { Color } from '../types';
import Search from '../components/Search';
import { FaTwitter } from 'react-icons/all';
import { FaFacebookF } from 'react-icons/all';
import { FaLinkedinIn } from 'react-icons/all';

const classPrefix = 'Home__';

const Home: React.FC = () => (
  <div className={`${classPrefix}basis`}>
    <section id="section-1" className="content">
      <div className="title">
        <Title
          title="Somatosensory Cortex Portal"
          subtitle="Explore the datasets!"
          hint="Welcome to the SSCx portal created by the <b>Blue Brain Project</b>. Come and explore both model data (in silico) and experiemental data (in vitro) of the rat brain."
          primary
        />
        <div className="cta">
          <Link to="/experimental">
            <Button primary width={140}>
              Explore
            </Button>
          </Link>
          <Link to="/styleguide">
            <Button width={140}>Read paper</Button>
          </Link>
        </div>
      </div>
      <img src={require('../assets/images/computer.svg')} alt="computer" />
      <div className="social-media">
        <a href="#">
          <div className="social-media-icon">
            <FaTwitter />
          </div>
        </a>
        <a href="#">
          <div className="social-media-icon">
            <FaFacebookF />
          </div>
        </a>
        <a href="#">
          <div className="social-media-icon">
            <FaLinkedinIn />
          </div>
        </a>
      </div>
    </section>

    <div className="search-form">
      <Search />
    </div>

    <section id="section-2">
      <div className="intro">
        <h2>Explore</h2>
        <h3>Navigate the various datasets made available</h3>
        <p>
          In order to address the still existing gaps in our knowledge in brain
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="content">
        <div className="workflow">
          <InfoBox2 title="Experimental data" color={'yellow' as Color} arrow>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </InfoBox2>
          <InfoBox2
            title="Reconstruction<br/>data"
            color={'blue' as Color}
            arrow
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </InfoBox2>
          <InfoBox2
            title="Digital<br/>reconstructions"
            color={'lavender' as Color}
            arrow
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </InfoBox2>
          <InfoBox2 title="Validations" color={'green' as Color}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </InfoBox2>
          <div>
            <InfoBox2 title="Predictions" color={'grey' as Color}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </InfoBox2>
            <small>+ The data is integrated in the Blue Brain Nexus.</small>
          </div>
        </div>
        <div className="image" />
      </div>
    </section>

    <section id="section-3">
      <h2>
        Select and Explore. Download.{' '}
        <span className="nowrap">
          Contribute
          <span className="accent-border" />
        </span>
      </h2>
      <div className="content">
        <div className="workflow">
          <InfoBox1
            icon="search"
            title="Select and Explore"
            teaser="Discover how the Blue Brain Project organizes collected data and extrapolates principles to rebuild digbitally reconstructed newtworks towards reconciling dicrepancies in literuture."
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </InfoBox1>
          <InfoBox1
            icon="download"
            title="Download"
            teaser="Enjoy selecting wich levels of detail you wish to explore and navigate back and forth between various datasets and see how they correlate."
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </InfoBox1>
          <InfoBox1
            icon="mail"
            title="Contribute"
            teaser="The Blue Brain Project has made various assets available for download throughout the portal, enjoy downloading your selected items for your own use."
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </InfoBox1>
        </div>
        <div className="image">
          <img
            id="screenshot"
            src={require('../assets/images/screenshot.png')}
            alt="screenshot"
          />
        </div>
      </div>
    </section>

    <section id="section-4">
      <div className="content">
        <div className="paper data-paper-container">
          <div className="data-paper">
            <h2>The paper</h2>
            <h3>
              <span className="accent-border" />
              About the data
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link to="/experimental">
              <Button>Read paper</Button>
            </Link>
          </div>
        </div>
        <img
          id="chip"
          src={require('../assets/images/chip.svg')}
          alt="microchip"
        />
        <div className="paper portal-paper-container">
          <div className="portal-paper">
            <div className="portal-paper-title">
              <h3>Paper about</h3>
              <h2>
                The portal <span className="accent-border accent-border-sm" />
              </h2>
            </div>
            <span className="accent-border accent-border-lg" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link to="/experimental">
              <Button>BBP website</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section id="section-5">
      <h2>
        Acknowledgments
        <span className="accent-border" />
      </h2>
      <img
        id="acknowledgments"
        src={require('../assets/images/acknowledgments.svg')}
        alt="acknowledgments"
      />
    </section>
  </div>
);

export default Home;
