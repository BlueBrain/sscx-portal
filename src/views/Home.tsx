import React from 'react';
import { Link } from 'react-router-dom';
import FullPage from '../layouts/FullPage';
import Title from '../components/Title';
import Button from '../components/Button';

const Home: React.FC = () => (
  <FullPage>
    <Title
      title="Somatosensory Cortex Portal"
      subtitle="Explore our datasets"
      hint="Explore model data of the rat brain, both in vitro and in silico."
      primaryColor="yellow"
    />
    <div role="navigation">
      <Link to="/experimental">
        <Button primary>Get started</Button>
      </Link>
      <br />
      <br />
      <Link to="/styleguide">
        <Button>Project styleguide</Button>
      </Link>
    </div>
  </FullPage>
);

export default Home;
