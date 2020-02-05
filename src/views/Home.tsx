import React from 'react';
import { Link } from 'react-router-dom';
import Filters from '../layouts/Header';

const Home: React.FC = () => (
  <>
    <h1 role="title">Somatosensory Cortex Portal</h1>
    <div role="navigation">
      <button>
        <Link to="/experimental">Experiments</Link>
      </button>
      <button>
        <Link to="/reconstruction">Reconstruction</Link>
      </button>
    </div>
  </>
);

export default Home;
