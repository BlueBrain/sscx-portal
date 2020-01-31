import React from 'react';
import { RouteProps, Redirect } from 'react-router';

import Home from './views/Home';
import LayerAnatomy from './views/experimental/LayerAnatomy';
import NeuronMorphology from './views/experimental/NeuronMorphology';
import NeuronElectrophysiology from './views/experimental/NeuronElectrophysiology';
import BrainRegions from './views/reconstruction/BrainRegions';

const routes: RouteProps[] = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/experimental',
    component: () => <Redirect to="/experimental/layeranatomy" />,
    exact: true,
  },
  {
    path: '/experimental/layeranatomy',
    component: LayerAnatomy,
    exact: true,
  },
  {
    path: '/experimental/neuronmorphology',
    component: NeuronMorphology,
    exact: true,
  },
  {
    path: '/experimental/neuronelectrophysiology',
    component: NeuronElectrophysiology,
    exact: true,
  },
  {
    path: '/reconstruction',
    component: () => <Redirect to="/reconstruction/brainregions" />,
    exact: true,
  },
  {
    path: '/reconstruction/brainregions',
    component: BrainRegions,
    exact: true,
  },
];

export default routes;
