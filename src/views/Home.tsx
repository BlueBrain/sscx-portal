// import './Home.scss';
import React from 'react';
import Link from 'next/link';

import Title from '../components/Title';
import ImageSlider from '../components/ImageSlider';
import Button from '../components/Button';
import InfoBox1 from '../components/Home/InfoBox1';
import InfoBox2 from '../components/Home/InfoBox2';
import { Color } from '../types';
import Search from '../components/Search';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import CtaButton from '../components/CtaButton';
import { basePath } from '../config';


const classPrefix = 'Home__';

const Home: React.FC = () => (
  <div className={`${classPrefix}basis`}>
    <section id="section-1" className="content">
      <ImageSlider images={[{
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-side.jpg`,
        alt: 'SSCx side view',
      }, {
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-top.jpg`,
        alt: 'SSCx top view'
      }, {
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-inside.jpg`,
        alt: 'SSCx inside view',
      }]}/>
      <div className="title">
        <Title
          title={<span>Somatosensory <br/> Cortex Portal</span>}
          subtitle="Explore the datasets!"
          hint="Welcome to the Somatosensory Cortex (SSCx) Portal created by the EPFL <b>Blue Brain Project</b>. Explore the datasets, models and visuals to understand how we reconstruct the rodent somatosensory cortex in silico."
          primary
        />
        <div className="cta">
          <CtaButton color="yellow">Explore now</CtaButton>
          <br/>
          <CtaButton className="mt-2" color="grey">Publications</CtaButton>

          {/* <a href="#section-3">
            <Button primary width={140}>
              Explore
            </Button>
          </a>
          <Link href="/styleguide">
            <Button width={140}>Read paper</Button>
          </Link> */}
        </div>
        {/* <div className="search-form">
          <Search />
        </div> */}
      </div>
      {/* <img
        className="top-section-image"
        src={require('url:../assets/images/computer.svg')}
        alt="computer"
      /> */}
      {/* <div className="social-media">
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
      </div> */}
    </section>

    <section id="section-2">
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
            teaser="Discover how the Blue Brain Project collects and organizes sparse multi-scale datasets, and extrapolates principles of organization for dense digital reconstructions of brain regions such as the SSCx."
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
            teaser="The Blue Brain Project has made various models and data available for you to download."
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
            teaser="Please get in touch if you wish to collaborate with us on experimental datasets or computational models presented here."
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
            src={`${basePath}/assets/images/screenshot.png`}
            alt="screenshot"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section id="section-3">
      <div className="intro">
        <h2 className="text-white">Explore</h2>
        <h3>Navigate the various datasets made available</h3>
        <p>
          In order to address the still existing gaps in our knowledge in brain
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="content">
        <div className="workflow">
          <InfoBox2
            title="Experimental data"
            color={'yellow' as Color}
            subsections={[
              { name: 'Layer Anatomy', icon: 'region' },
              { name: 'Neuron Morphology', icon: 'neuron' },
              { name: 'Neuron Electrophysiology', icon: 'neuron' },
            ]}
            arrow
          >
            <p>
              The first step in the workflow to reconstruct the SSCx involves acquiring and organizing data from anatomical and electrophysiological cortical slices. 
              We have collected sparse data from our own laboratory and published sources describing the structural and functional organization of the SSCx at various levels – ranging from individual neurons to synaptic connections and network activity in microcircuits. These data provide constraints to build computational models at specific levels of detail.
            </p>
          </InfoBox2>
          <InfoBox2
            title="Reconstruction<br/>data"
            color={'blue' as Color}
            subsections={[
              { name: 'Brain Regions', icon: 'region' },
              { name: 'Microcircuit', icon: 'circuit' },
              { name: 'Synaptic Pathways', icon: 'synapse' },
              { name: 'Neurons', icon: 'neuron' },
            ]}
            arrow
          >
            <p>
              The next step in the SSCx workflow is to extract the maximal possible information from this sparse data to exploit interdependencies in the experimental data to build detailed, dense models from sparse data sets and employ algorithmic procedures that apply the converging constraints to fill in the missing data. In other words, we mathematically model the interdependencies to predict the missing datasets needed for a digital reconstruction of the entire SSCx. In this way, we begin with sparse experimental data, identify rules and principles of organization, extrapolate missing information to fill knowledge gaps enabling a dense data-driven digital reconstruction of the entire SSCx.
            </p>
          </InfoBox2>
          <InfoBox2
            title="Digital<br/>reconstructions"
            color={'lavender' as Color}
            subsections={[
              { name: 'Brain Regions', icon: 'region' },
              { name: 'Microcircuit', icon: 'circuit' },
              { name: 'Synaptic Pathways', icon: 'synapse' },
              { name: 'Neurons', icon: 'neuron' },
            ]}
            arrow
          >
            <p>
              Blue Brain’s digital reconstructions are formed from data at a specific age and are therefore snapshots of the structure and physiology of the brain at a given developmental stage of the brain. The reconstructions integrate the data and knowledge on molecular, cellular and circuit anatomy, and physiology (e.g., reconstructed morphologies, electrophysiological, synaptic, and connectivity models). Circuit reconstructions are built from cells and based on a standardized workflow enabled by Blue Brain Project software tools and supercomputing infrastructure. The parameterization of the tissue model is strictly based on biological data — directly, where available, generalized from data obtained in other similar systems, where unavailable, or predicted from multi-constraints imposed by sparse data.
            </p>
          </InfoBox2>
          <InfoBox2
            title="Validations"
            color={'green' as Color}
            subsections={[
              { name: 'Brain Regions', icon: 'region' },
              { name: 'Microcircuit', icon: 'circuit' },
              { name: 'Synaptic Pathways', icon: 'synapse' },
              { name: 'Neurons', icon: 'neuron' },
            ]}
          >
            <p>
              The data-driven reconstruction of the SSCx provides a scaffold that enables the integration of available experimental data, identifies missing experimental data, and facilitates the iterative refinement of constituent models. Validations are a crucial part of the data-driven modeling workflows that reduce the risk that errors could lead to major inaccuracies in the reconstruction or in simulations of its emergent behavior. Successful validations not only enable the systematic exploration of the emergent properties of the model but also establish predictions for future in vitro experiments or question existing experimental data. Failure in validation could also indicate errors in experimental data and identify future refinements. Rigorous validation of a metric at one level of detail, therefore, also prevents error amplification to the next level and triggers specific experimental refinements.
            </p>
          </InfoBox2>
          <div>
            <InfoBox2
              title="Predictions"
              color={'grey' as Color}
              subsections={[
                { name: 'Brain Regions', icon: 'region' },
                { name: 'Microcircuit', icon: 'circuit' },
                { name: 'Synaptic Pathways', icon: 'synapse' },
                { name: 'Neurons', icon: 'neuron' },
              ]}
            >
              <p>
                The digital reconstruction of the SSCx provides an array of predictions across its many levels of organization. These predictions provide insights to link underlying structure with function. In addition, predictions are also a means to validate the component models of the SSCx model and identify missing data that could guide targeted experiments.
              </p>
            </InfoBox2>
            <small>+ The data is integrated in the Blue Brain Nexus.</small>
          </div>
        </div>
        <div className="image" />
      </div>
    </section>

    <section id="section-4">
      <div className="content">
        <div className="paper data-paper-container">
          <div className="data-paper">
            <h2 className="text-white">The paper</h2>
            <h3 className="text-white">
              <span className="accent-border" />
              About the data
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link href="/experimental">
              <Button>Read paper</Button>
            </Link>
          </div>
        </div>
        <img
          id="chip"
          src={`${basePath}/assets/images/chip.png`}
          alt="microchip"
          loading="lazy"
        />
        <div className="paper portal-paper-container">
          <div className="portal-paper">
            <div className="portal-paper-title">
              <h3 className="text-white">Paper about</h3>
              <h2 className="text-white">
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
            <Link href="/experimental">
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
        src={`${basePath}/assets/images/acknowledgments.svg`}
        alt="acknowledgments"
        loading="lazy"
      />
    </section>
  </div>
);

export default Home;
