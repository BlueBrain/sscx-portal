import React from 'react';
import { Row, Col } from 'antd';

import Title from '../components/Title';
import ImageSlider from '../components/ImageSlider';
import InfoBox1 from '../components/Home/InfoBox1';
import CtaButton from '../components/CtaButton';
import PublicationBlock from '../components/PublicationBlock';
import ExploreSectionCard from '../components/ExploreSectionCard';
import { basePath } from '../config';


const classPrefix = 'Home__';


const Home: React.FC = () => (
  <div className={`${classPrefix}basis`}>
    <section className="content section-1">
      <ImageSlider images={[{
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-side.jpeg`,
        alt: 'SSCx side view',
      }, {
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-top.jpeg`,
        alt: 'SSCx top view'
      }, {
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-inside.jpeg`,
        alt: 'SSCx inside view',
      }]}/>
      <div className="gradient"></div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '60px',
        color: 'grey',
      }}>
        ©Blue Brain Project/EPFL 2005-2021.
      </div>

      <div className="title">
        <Title
          title={<span>Somatosensory <br/> Cortex Portal</span>}
          hint={<>
            <p>
              The SSCx portal is a freely accessible resource, which provides access to the <b>Blue Brain Project</b>'s
              experimental data sets on the multi-scale organization of the juvenile rat primary somatosensory cortex -
              sub-regions, microcircuits, neurons, synapses, and the resulting computational models.
            </p>
            <p>
              The portal describes a workflow for how sparse experimental data are gathered and extrapolated
              to obtain dense computational models, their validation and
              resulting predictions across multiple levels of organization.
            </p>
          </>}
          primary
        />
        <div>
          <CtaButton href="#explore" color="yellow">Explore now</CtaButton>
          <br/>
          <CtaButton href="#publications" className="mt-2" color="grey">Publications</CtaButton>
        </div>
      </div>
    </section>

    <section className="section-2">
      <h2>
        Select and Explore. Download. Contribute
        <span className="accent-border" />
      </h2>
      <div className="content">
        <div className="workflow">
          <InfoBox1
            icon="checkmark"
            title="Select and Explore"
          >
            <p>
              Discover how the Blue Brain Project collects and organizes sparse multi-scale datasets, and extrapolates principles of organization for dense digital reconstructions of brain regions such as the SSCx.
            </p>
          </InfoBox1>
          <InfoBox1
            icon="checkmark"
            title="Download"
          >
            <p>
              The Blue Brain Project has made various models and data available for you to download.
            </p>
          </InfoBox1>
          <InfoBox1
            icon="checkmark"
            title="Contribute"
          >
            <p>
              Please get in touch if you wish to collaborate with us on experimental datasets or computational models presented here.
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

    <section id="explore" className="section-3">
      <div className="intro">
        <h2 className="text-white">Explore</h2>
        <h3>Navigate the various datasets made available</h3>
        <p>
          In order to address the still existing gaps in our knowledge in brain
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="cards">
        <Row gutter={3} justify="center">
          <Col xs={24} md={8} className="mb-2">
            <ExploreSectionCard
              title={<>Experimental <br/> data</>}
              description={<>
                <p>
                  The first step in the reconstruction of the SSCx involves the acquisition and organization of data
                  from anatomical and electrophysiological cortical slices from rodent brains.
                </p>
                <p>
                  Sparse data has been collected both from our own laboratory and from published sources worldwide,
                  which describes the structural and functional organization of the SSCx at various anatomical levels.
                  This ranges from individual neurons to synaptic connections and network activity in microcircuits.
                  The data provides constraints, rules, and the principles to build computational models
                  at specific levels of detail.
                </p>
              </>}
              image="experimental-data"
              bgColor="yellow"
              links={[
                { label: 'Layer Anatomy', href: '/experimental-data/layer-anatomy/', icon: 'layer' },
                { label: 'Neuron Morphology', href: '/experimental-data/neuron-morphology', icon: 'neuron' },
                { label: 'Neuron Electrophysiology', href: '/experimental-data/neuron-electrophysiology', icon: 'neuron' },
              ]}
            />
          </Col>

          <Col xs={24} md={8} className="mb-2">
            <ExploreSectionCard
              title={<>Reconstruction <br/> data</>}
              description={<p>
                Step two in the SSCx workflow is the extraction of as much information as possible
                from the previously collected sparse data and the exploitation of interdependencies
                to build detailed and dense models of individual cells and cell-circuits.
                From sparse experimental data sets, rules and principles of organization are identified
                and missing information is extrapolated to fill knowledge gaps,
                which enable a dense data-driven digital reconstruction of the entire SSCx region.
              </p>}
              image="reconstruction-data"
              bgColor="light-blue"
              links={[
                { label: 'Brain Regions', href: '', icon: 'layer' },
                { label: 'Microcircuit', href: '', icon: 'microcircuit' },
                { label: 'Synaptic Pathways', href: '', icon: 'pathway' },
                { label: 'Neurons', href: '/reconstruction-data/neurons/', icon: 'neuron' },
              ]}
            />
          </Col>

          <Col xs={24} md={8} className="mb-2">
            <ExploreSectionCard
              title={<>Digital <br/> reconstructions</>}
              description={<>
                <p>
                  In the third step of our reconstruction workflow, digital reconstructions are built and based on
                  experimental datasets taken from specimens at a specific stage of development.
                  They are therefore, digital snapshots of the structure and physiology of the brain
                  at a specific age range. These digital reconstructions integrate data and knowledge of molecular,
                  cellular and circuit anatomy, as well as their physiology.
                </p>
                <p>
                  Starting from individually reconstructed cell morphologies and
                  corresponding electrophysiological behaviors, they can be assembled into
                  specific brain region circuits along with their individual synaptic and connectivity models.
                  Circuit reconstructions are based on a standardized workflow enabled by
                  Blue Brain Project software tools and supercomputing infrastructure.
                  The parameterization of the tissue model is strictly based on biological data:
                  directly, where available, generalized from data obtained in other similar systems;
                  or, where unavailable, predicted from multi-constraints imposed by sparse data.
                </p>
              </>}
              image="digital-reconstructions"
              bgColor="blue"
              links={[
                { label: 'Brain Regions', href: '/digital-reconstructions/brain-regions/', icon: 'layer' },
                { label: 'Microcircuit', href: '/digital-reconstructions/microcircuit/', icon: 'microcircuit' },
                { label: 'Synaptic Pathways', href: '/digital-reconstructions/synaptic-pathways/', icon: 'pathway' },
                { label: 'Neurons', href: '/digital-reconstructions/neurons', icon: 'neuron' },
              ]}
            />
          </Col>

          <Col xs={24} md={8} className="mb-2">
            <ExploreSectionCard
              title="Validations"
              description={<>
                <p>
                  Validations are a crucial part of the data-driven modeling workflows that reduce the risk
                  that errors may lead to major inaccuracies in the reconstruction or
                  in simulations of emergent behavior. Successful validations not only enable
                  the systematic exploration of the emergent properties of the model,
                  but also establish predictions for future in vitro experiments,
                  or may call into question existing experimental data. Failure in validation may also indicate
                  errors in experimental data, permitting the identification of future refinements.
                  Rigorous validation of a metric at one level of detail therefore also prevents error amplification
                  to the next level, and triggers specific experimental refinements.
                </p>
                <p>
                  The Blue Brain Project Validation step provides a scaffold that enables the integration of
                  available experimental data, identifies missing experimental data,
                  and facilitates the iterative refinement of constituent models.
                </p>
              </>}
              image="validations"
              bgColor="green"
              links={[
                { label: 'Brain Regions', href: '', icon: 'layer' },
                { label: 'Microcircuit', href: '', icon: 'microcircuit' },
                { label: 'Synaptic Pathways', href: '', icon: 'pathway' },
                { label: 'Neurons', href: '', icon: 'neuron' },
              ]}
            />
          </Col>

          <Col xs={24} md={8} className="mb-2">
            <ExploreSectionCard
              title="Predictions"
              description={<p>
                The digital reconstruction of the SSCx provides an array of predictions
                across its many levels of organization. These predictions provide insights
                to link underlying structure with function. In addition, predictions are also a means
                to validate the component models of the SSCx model and identify missing data
                that could guide targeted experiments.
                In particular, we provide predictions on the propagation of activity
                across the different sub-regions of the SSCx.
              </p>}
              image="predictions"
              bgColor="grey"
              links={[
                { label: 'Brain Regions', href: '', icon: 'layer' },
                { label: 'Microcircuit', href: '', icon: 'microcircuit' },
                { label: 'Synaptic Pathways', href: '', icon: 'pathway' },
                { label: 'Neurons', href: '', icon: 'neuron' },
              ]}
            />
          </Col>

        </Row>

        <small className="text-grey"><sup>*</sup> This page is under construction</small>
      </div>
    </section>

    <section id="publications" className="section-4">
      <div className="content">
        <div className="row w-100">
          <div className="col-xs-12 col-md-6">
            <h1 className="text-uppercase m-0">Publications</h1>
            <p className="text-yellow text-subtitle mb-3">Read up on our latest publications !</p>

            <PublicationBlock
              href="#"
              description={(
                <>
                  <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                  sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                </>
              )}
              authors={<>Author <i>et al.</i>, 2021</>}
            />

            <PublicationBlock
              href="#"
              description={
                <>
                  <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                  sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                </>
              }
              authors={<>Author <i>et al.</i>, 2021</>}
            />

            <PublicationBlock
              href="#"
              description={
                <>
                  <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                  sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                </>
              }
              authors={<>Author <i>et al.</i>, 2021</>}
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
