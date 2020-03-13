import './Home.less';
import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';

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
          <Button width={140} primary>Get started</Button>
        </Link>
        <Link to="/styleguide">
          <Button width={140}>Read paper</Button>
        </Link>
      </div>
      <img src={require('../assets/images/computer.svg')} alt='computer'/>
    </section>

    <section id='section-2'>
      <h2>Explore the data. Select and analyze. <span className='nowrap'>Download<span className='accent-border' /></span></h2>
    </section>
  </div>
);

export default Home;
