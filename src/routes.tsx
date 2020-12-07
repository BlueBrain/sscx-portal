import React, { lazy } from 'react';
import { RouteProps, Redirect } from 'react-router';


const routes: RouteProps[] = [
  {
    path: '/',
    component: lazy(() => import('./views/Home')),
    exact: true,
  },
  {
    path: '/glossary',
    component: lazy(() => import('./views/Glossary')),
    exact: true,
  },
  {
    path: '/about',
    component: lazy(() => import('./views/About')),
    exact: true,
  },
  {
    path: '/contact-and-submission',
    component: lazy(() => import('./views/Contact')),
    exact: true,
  },
  {
    path: '/styleguide',
    component: lazy(() => import('./views/Styleguide')),
    exact: true,
  },
  // {
  //   path: '/downloads',
  //   component: lazy(() => import('./views/Downloads')),
  //   exact: true,
  // },
  // Experimental Data
  {
    path: '/experimental-data',
    component: () => <Redirect to="/experimental-data/layer-anatomy" />,
    exact: true,
  },
  {
    path: '/experimental-data/layer-anatomy',
    component: lazy(() => import('./views/experimental/LayerAnatomy')),
    exact: true,
  },
  {
    path: '/experimental-data/neuron-morphology',
    component: lazy(() => import('./views/experimental/NeuronMorphology')),
    exact: true,
  },
  {
    path: '/experimental-data/neuron-electrophysiology',
    component: lazy(() => import('./views/experimental/NeuronElectrophysiology')),
    exact: true,
  },
  // Reconstruction Data
  {
    path: '/reconstruction-data',
    component: () => <Redirect to="/reconstruction-data/brain-regions" />,
    exact: true,
  },
  {
    path: '/reconstruction-data/brain-regions',
    component: lazy(() => import('./views/reconstructionData/BrainRegions')),
    exact: true,
  },
  {
    path: '/reconstruction-data/neurons',
    component: lazy(() => import('./views/reconstructionData/Neurons')),
    exact: true,
  },
  {
    path: '/reconstruction-data/synaptic-pathways',
    component: lazy(() => import('./views/reconstructionData/SynapticPathways')),
    exact: true,
  },
  {
    path: '/reconstruction-data/microcircuit',
    component: lazy(() => import('./views/reconstructionData/Microcircuit')),
    exact: true,
  },
  // Digital Reconstructions
  {
    path: '/digital-reconstructions',
    component: () => <Redirect to="/digital-reconstructions/brain-regions" />,
    exact: true,
  },
  {
    path: '/digital-reconstructions/brain-regions',
    component: lazy(() => import('./views/digitalReconstructions/BrainRegions')),
    exact: true,
  },
  {
    path: '/digital-reconstructions/neurons',
    component: lazy(() => import('./views/digitalReconstructions/Neurons')),
    exact: true,
  },
  {
    path: '/digital-reconstructions/synaptic-pathways',
    component: lazy(() => import('./views/digitalReconstructions/SynapticPathways')),
    exact: true,
  },
  {
    path: '/digital-reconstructions/microcircuit',
    component: lazy(() => import('./views/digitalReconstructions/Microcircuit')),
    exact: true,
  },
  // Validations
  {
    path: '/validations',
    component: () => <Redirect to="/validations/brain-regions" />,
    exact: true,
  },
  {
    path: '/validations/brain-regions',
    component: lazy(() => import('./views/validations/BrainRegions')),
    exact: true,
  },
  {
    path: '/validations/neurons',
    component: lazy(() => import('./views/validations/Neurons')),
    exact: true,
  },
  {
    path: '/validations/synaptic-pathways',
    component: lazy(() => import('./views/validations/SynapticPathways')),
    exact: true,
  },
  {
    path: '/validations/microcircuit',
    component: lazy(() => import('./views/validations/Microcircuit')),
    exact: true,
  },
  // Predictions
  {
    path: '/predictions',
    component: () => <Redirect to="/predictions/brain-regions" />,
    exact: true,
  },
  {
    path: '/predictions/brain-regions',
    component: lazy(() => import('./views/predictions/BrainRegions')),
    exact: true,
  },
  {
    path: '/predictions/neurons',
    component: lazy(() => import('./views/predictions/Neurons')),
    exact: true,
  },
  {
    path: '/predictions/synaptic-pathways',
    component: lazy(() => import('./views/predictions/SynapticPathways')),
    exact: true,
  },
  {
    path: '/predictions/microcircuit',
    component: lazy(() => import('./views/predictions/Microcircuit')),
    exact: true,
  },
];

export default routes;
