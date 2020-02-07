import React from 'react';
import { RouteProps, Redirect } from 'react-router';

import Home from './views/Home';
import ExpLayerAnatomy from './views/experimental/LayerAnatomy';
import ExpMicrocircuits from './views/experimental/Microcircuits';
import RecBrainRegions from './views/reconstruction/BrainRegions';
import RecSynapticPathways from './views/reconstruction/SynapticPathways';
import Styleguide from './views/Styleguide';

const routes: RouteProps[] = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/styleguide',
    component: Styleguide,
    exact: true,
  },
  {
    path: '/experimental',
    component: () => <Redirect to="/experimental/layer-anatomy" />,
    exact: true,
  },
  {
    path: '/experimental/layer-anatomy',
    component: ExpLayerAnatomy,
    exact: true,
  },
  {
    path: '/experimental/microcircuits',
    component: ExpMicrocircuits,
    exact: true,
  },
  {
    path: '/reconstruction',
    component: () => <Redirect to="/reconstruction/brain-regions" />,
    exact: true,
  },
  {
    path: '/reconstruction/brain-regions',
    component: RecBrainRegions,
    exact: true,
  },
  {
    path: '/reconstruction/synaptic-pathways',
    component: RecSynapticPathways,
    exact: true,
  },
];

export default routes;
