import React from 'react';
import { Row, Col } from 'antd';

import Title from '../components/Title';
import ImageSlider from '../components/ImageSlider';
import InfoBox1 from '../components/Home/InfoBox1';
import CtaButton from '../components/CtaButton';
import PublicationBlock from '../components/PublicationBlock';
import ExploreSectionCard from '../components/ExploreSectionCard';
import { basePath } from '../config';
import { cardsData, publicationData } from './home-constans';

const classPrefix = 'Home__';


const Home: React.FC = () => (
  <div className={`${classPrefix}basis`}>
    <section className="content section-1">
      <ImageSlider images={[{
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-side.jpg`,
        alt: 'SSCx side view',
      }, {
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-top.jpg`,
        alt: 'SSCx top view',
      }, {
        src: `${basePath}/assets/images/backgrounds/home-page/sscx-inside.jpg`,
        alt: 'SSCx inside view',
      }]}
      />
      <div className="gradient" />

      <div className="copyright">
        ©Blue Brain Project/EPFL 2005-2021.
      </div>

      <div className="title">
        <Title
          title={<span>Somatosensory <br /> Cortex Portal</span>}
          hint={(
            <>
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
            </>
          )}
          primary
        />
        <div className="link-buttons">
          <CtaButton href="#explore" color="yellow">Explore now</CtaButton>
          <br />
          <CtaButton href="#publications" className="mt-2" color="grey">Publications</CtaButton>
        </div>
      </div>
    </section>

    <section id="about" className="section-about p-4">
      <div className="container">
        <h2 className="text-uppercase mt-2 mb-2">
          About
          <span className="accent-border" />
        </h2>

        <div className="row">
          <div className="col-xs-12 col-sm-6 bg-white p-2">
            <h4>Welcome to the SSCx Portal</h4>
            <p>
              The SSCx portal is a freely accessible resource which provides experimental data
              on the juvenile rat primary somatosensory cortex, and an explanation of the extrapolation process
              for translating this data into a structural and behavioral digital reconstruction.
              The portal explores new avenues for filling the gaps in existing data, as well as presenting data
              which has been validated against literature and the inferred hypotheses which still need validation.
            </p>
            <p>
              The rat brain is made up of hundreds of different regions including the Somatosensory Cortex (SSCx).
              This area of the cortex, which is the region of the brain associated with specific cognitive processes,
              receives and processes sensory information including touch, pain and temperature.
              It is referred to as the ‘touch map’ of the body.
            </p>
            <p>
              The portal presents the Blue Brain reconstruction of a rodent’s Somatosensory Cortex “in silico”,
              which is a process or experiment performed on a computer as opposed to in vivo experiments
              conducted in live organisms, and in vitro experiments made of organic tissue under the microscope.
              Our digital reconstruction of a rat Somatosensory Cortex allows us a better vision and understanding
              of the anatomy, to see behavior recorded in experimental data which is then translated
              into our in silico model, the validation of these translations against all accessible literature,
              and the testing of new hypotheses under various conditions.
            </p>
            <p>
              The SSCx portal gives a clear view of the process used to reconstruct a brain region,
              taking you through the various Data Sections and levels of magnitude, and offering a unique opportunity
              to observe the various results in 3D data visualizations.
            </p>
            <p>
              The aim of the EPFL Blue Brain Project, a Swiss brain research initiative is to establish
              in silico neuroscience as a complementary approach alongside experimental, theoretical
              and clinical neuroscience to understanding the brain, by building the world’s first
              biologically detailed digital reconstructions and simulations of the mouse brain.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* <section className="section-2">
      <h2 className="text-uppercase">
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
    </section> */}

    <section id="explore" className="section-3">
      <div className="intro">
        <h2 className="text-white mb-2 text-uppercase">Explore</h2>
        <p>Navigate the various datasets made available</p>
      </div>

      <div className="cards">
        <Row gutter={3} justify="center">
          {cardsData.map(({ title, description, image, backgroundColor, links }) => (
            <Col key={image} xs={24} sm={12} md={8} className="mb-2">
              <ExploreSectionCard
                title={title}
                description={description.map((parahraph, index) => (
                  <p key={index}>
                    {parahraph}
                  </p>
                ))}
                image={image}
                bgColor={backgroundColor}
                links={links}
              />
            </Col>
          ))}
        </Row>

        <small className="text-grey"><sup>*</sup> This page is under construction</small>
      </div>
    </section>

    <section id="publications" className="section-4">
      <div className="content">
        <div className="row no-gutters w-100">
          <div className="col-xs-12 col-md-6">
            <h1 className="text-uppercase m-0">Publications</h1>
            <p className="text-yellow text-subtitle mb-3">Read up on our latest publications !</p>
            {publicationData.map(({ href, authors, description }, index) => (
              <PublicationBlock
                key={index}
                href={href}
                description={description}
                authors={authors}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
