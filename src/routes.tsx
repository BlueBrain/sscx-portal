import React from 'react';
import { RouteProps, Redirect } from 'react-router';

import Home from './views/Home';
// Experimental Data
import ExpLayerAnatomy from './views/experimental/LayerAnatomy';
import ExpNeuronMorpho from './views/experimental/NeuronMorphology';
import ExpNeuronElectro from './views/experimental/NeuronElectrophysiology';
// Reconstruction Data
import ExtBrainRegions from './views/reconstructionData/BrainRegions';
import ExtMicrocircuits from './views/reconstructionData/Microcircuit';
import ExtSynapticPathways from './views/reconstructionData/SynapticPathways';
import ExtNeurons from './views/reconstructionData/Neurons';
// Digital Reconstructions
import RecBrainRegions from './views/digitalReconstructions/BrainRegions';
import RecNeurons from './views/digitalReconstructions/Neurons';
import RecSynapticPathways from './views/digitalReconstructions/SynapticPathways';
import RecMicrocircuit from './views/digitalReconstructions/Microcircuit';
// Validations
import ValBrainRegions from './views/validations/BrainRegions';
import ValNeurons from './views/validations/Neurons';
import ValSynapticPathways from './views/validations/SynapticPathways';
import ValMicrocircuit from './views/validations/Microcircuit';
// Predictions
import PreBrainRegions from './views/predictions/BrainRegions';
import PreNeurons from './views/predictions/Neurons';
import PreSynapticPathways from './views/predictions/SynapticPathways';
import PreMicrocircuit from './views/predictions/Microcircuit';
import Styleguide from './views/Styleguide';
import Download from './views/Downloads';

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
    path: '/downloads',
    component: Download,
    exact: true,
  },
  // Experimental Data
  {
    path: '/experimental-data',
    component: () => <Redirect to="/experimental-data/layer-anatomy" />,
    exact: true,
  },
  {
    path: '/experimental-data/layer-anatomy',
    component: ExpLayerAnatomy,
    exact: true,
  },
  {
    path: '/experimental-data/neuron-morphology',
    component: ExpNeuronMorpho,
    exact: true,
  },
  {
    path: '/experimental-data/neuron-electrophysiology',
    component: ExpNeuronElectro,
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
    component: ExtBrainRegions,
    exact: true,
  },
  {
    path: '/reconstruction-data/neurons',
    component: ExtNeurons,
    exact: true,
  },
  {
    path: '/reconstruction-data/synaptic-pathways',
    component: ExtSynapticPathways,
    exact: true,
  },
  {
    path: '/reconstruction-data/microcircuit',
    component: ExtMicrocircuits,
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
    component: RecBrainRegions,
    exact: true,
  },
  {
    path: '/digital-reconstructions/neurons',
    component: RecNeurons,
    exact: true,
  },
  {
    path: '/digital-reconstructions/synaptic-pathways',
    component: RecSynapticPathways,
    exact: true,
  },
  {
    path: '/digital-reconstructions/microcircuit',
    component: RecMicrocircuit,
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
    component: ValBrainRegions,
    exact: true,
  },
  {
    path: '/validations/neurons',
    component: ValNeurons,
    exact: true,
  },
  {
    path: '/validations/synaptic-pathways',
    component: ValSynapticPathways,
    exact: true,
  },
  {
    path: '/validations/microcircuit',
    component: ValMicrocircuit,
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
    component: PreBrainRegions,
    exact: true,
  },
  {
    path: '/predictions/neurons',
    component: PreNeurons,
    exact: true,
  },
  {
    path: '/predictions/synaptic-pathways',
    component: PreSynapticPathways,
    exact: true,
  },
  {
    path: '/predictions/microcircuit',
    component: PreMicrocircuit,
    exact: true,
  },
];

export default routes;
