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
        ©Blue Brain Project/EPFL 2005-{`${(new Date()).getFullYear()}`}.
      </div>

      <div className="title">
        <Title
          title={<span>Somatosensory <br /> Cortex Portal</span>}
          hint={(
            <>
              <p>
                Welcome to the SSCx Portal from the EPFL <b>Blue Brain Project</b>.
              </p>
              <p>
                Discover a tissue-level model of the rodent somatosensory cortex 'in silico'.
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
            <p>
              The rat brain is made up of hundreds of different regions including the
              Somatosensory Cortex (SSCx). This area of the cortex, which is the region of the brain
              associated with specific cognitive processes, receives and processes sensory information
              including touch, pain and temperature. It is referred to as the 'touch map' of the body.
            </p>
            <p>
              The SSCx portal is a freely accessible resource, which provides multi-scale
              experimental data on the cellular, synaptic and microcircuit organization of juvenile rat
              primary somatosensory cortex. The portal provides a description of the extrapolation
              process for translating sparse experimental data into a dense tissue-level model. The
              portal also explores new avenues for filling the gaps in existing knowledge, as well
              as presenting data which has been validated against literature and the inferred
              hypotheses which still need validation.
            </p>
            <p>
              The SSCx portal enables a data-driven view to
              build a computational model of an entire brain region, taking you through the
              various experimental data, resulting component models and 3D visualisations of the
              activity of the tissue level model.
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

    <section id="contact" className="section-5">
      <h2 className="contact-us-container">
        <span>CONTACT US</span>
        <span className="accent-border" />
      </h2>
      <p>
        Let’s stay in touch!
      </p>
      <p>
        For all inquiries, support and collaborations, please email:
        <a href="mailto:sscx.portal@groupes.epfl.ch">sscx.portal@groupes.epfl.ch</a>
      </p>
    </section>
  </div>
);

export default Home;
