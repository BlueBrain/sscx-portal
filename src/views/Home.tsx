import './Home.less';
import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import InfoBox1 from '../components/Home/InfoBox1';
import InfoBox2 from '../components/Home/InfoBox2';
import { Color } from '../types';

const classPrefix = 'Home__';

const Home: React.FC = () => (
  <div className={`${classPrefix}basis`}>
    <section id='section-1'>
      <Title
        title="Somatosensory Cortex Portal"
        subtitle="Explore the datasets!"
        hint="Welcome to the SSCx portal created by the <b>Blue Brain Project</b>. Come and explore both model data (in silico) and experiemental data (in vitro) of the rat brain."
        primary
      />
      <div className='cta'>
        <Link to="/experimental">
          <Button large width={140} primary>Get started</Button>
        </Link>
        <Link to="/styleguide">
          <Button large width={140}>Read paper</Button>
        </Link>
      </div>
      <img src={require('../assets/images/computer.svg')} alt='computer'/>
    </section>

    <section id='section-2'>
      <h2>Explore the data. Select and analyze. <span className='nowrap'>Download<span
        className='accent-border'/></span></h2>
      <div className='workflow'>
        <InfoBox1 title='Explore'
                  teaser='Discover how the Blue Brain Project organizes collected data and extrapolates principles to rebuild digbitally reconstructed newtworks towards reconciling dicrepancies in literuture.'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.</p>
        </InfoBox1>
        <InfoBox1 title='Select & Analyze'
                  teaser='Enjoy selecting wich levels of detail you wish to explore and navigate back and forth between various datasets and see how they correlate.'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.</p>
        </InfoBox1>
        <InfoBox1 title='Download'
                  teaser='The Blue Brain Project has made various assets available for download throughout the portal, enjoy downloading your selected items for your own use.'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.</p>
        </InfoBox1>
      </div>
      <img id='screenshot' src={require('../assets/images/screenshot.png')} alt='screenshot'/>
    </section>

    <section id='section-3'>
      <div className='intro'>
        <h2>Explore</h2>
        <h3>Navigate the various datasets made available</h3>
        <p>In order to address the still existing gaps in our knowledge in brain ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.</p>
      </div>
      <div className='workflow'>
        <InfoBox2 title='Collected<br/>experimental data'
                  color={'yellow' as Color} arrow>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>
        </InfoBox2>
        <InfoBox2 title='Extrapolated<br/>data'
                  color={'blue' as Color} arrow>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>
        </InfoBox2>
        <InfoBox2 title='Digital<br/>reconstructions'
                  color={'lavender' as Color} arrow>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>
        </InfoBox2>
        <InfoBox2 title='Validated<br/>findings'
                  color={'green' as Color}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>
        </InfoBox2>
        <InfoBox2 title='Predicted<br/>novel behaviours'
                  color={'grey' as Color}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>
        </InfoBox2>
        <small>+ The data is integrated in the Blue Brain Nexus.</small>
      </div>
      <img id="flow" src={require('../assets/images/flow.svg')} alt='data flow'/>
    </section>

    <section id='section-4'>
      <div className='paper data-paper'>
        <h2>The paper</h2>
        <h3><span className='accent-border'/>About the data</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.</p>
        <Link to="/experimental">
          <Button>Read paper</Button>
        </Link>
      </div>
      <img id="chip" src={require('../assets/images/chip.svg')} alt='microchip'/>
      <div className='paper portal-paper'>
        <div className='portal-paper-title'>
          <h3>Paper about</h3>
          <h2>The portal <span className='accent-border'/></h2>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.</p>
        <Link to="/experimental">
          <Button>BBP website</Button>
        </Link>
      </div>
    </section>
  </div>
);

export default Home;
