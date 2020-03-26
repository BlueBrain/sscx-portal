import React from 'react';
import { RouteProps, Redirect } from 'react-router';

import Home from './views/Home';
// Experimental Data
import ExpLayerAnatomy from './views/experimental/LayerAnatomy';
import ExpNeuronMorpho from './views/experimental/NeuronMorphology';
import ExpNeuronElectro from './views/experimental/NeuronElectrophysiology';
// Reconstruction Data
import ExtBrainRegions from './views/reconstructionData/BrainRegions';
import ExtLayerAnatomy from './views/reconstructionData/LayerAnatomy';
import ExtSynapticPathways from './views/reconstructionData/SynapticPathways';
import ExtMicrocircuits from './views/reconstructionData/Microcircuits';
// Digital Reconstructions
import RecBrainRegions from './views/digitalReconstructions/BrainRegions';
import RecLayerAnatomy from './views/digitalReconstructions/LayerAnatomy';
import RecSynapticPathways from './views/digitalReconstructions/SynapticPathways';
import RecMicrocircuits from './views/digitalReconstructions/Microcircuits';
// Validation
import ValBrainRegions from './views/validation/BrainRegions';
import ValLayerAnatomy from './views/validation/LayerAnatomy';
import ValSynapticPathways from './views/validation/SynapticPathways';
import ValMicrocircuits from './views/validation/Microcircuits';
// Prediction
import PreBrainRegions from './views/predictions/BrainRegions';
import PreLayerAnatomy from './views/predictions/LayerAnatomy';
import PreSynapticPathways from './views/predictions/SynapticPathways';
import PreMicrocircuits from './views/predictions/Microcircuits';
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
  // Experimental
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
    path: '/experimental/neuron-morphology',
    component: ExpNeuronMorpho,
    exact: true,
  },
  {
    path: '/experimental/neuron-electrophysiology',
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
    path: '/reconstruction-data/layer-anatomy',
    component: ExtLayerAnatomy,
    exact: true,
  },
  {
    path: '/reconstruction-data/synaptic-pathways',
    component: ExtSynapticPathways,
    exact: true,
  },
  {
    path: '/reconstruction-data/microcircuits',
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
    path: '/digital-reconstructions/layer-anatomy',
    component: RecLayerAnatomy,
    exact: true,
  },
  {
    path: '/digital-reconstructions/synaptic-pathways',
    component: RecSynapticPathways,
    exact: true,
  },
  {
    path: '/digital-reconstructions/microcircuits',
    component: RecMicrocircuits,
    exact: true,
  },
  // Validation
  {
    path: '/validation',
    component: () => <Redirect to="/validation/brain-regions" />,
    exact: true,
  },
  {
    path: '/validation/brain-regions',
    component: ValBrainRegions,
    exact: true,
  },
  {
    path: '/validation/layer-anatomy',
    component: ValLayerAnatomy,
    exact: true,
  },
  {
    path: '/validation/synaptic-pathways',
    component: ValSynapticPathways,
    exact: true,
  },
  {
    path: '/validation/microcircuits',
    component: ValMicrocircuits,
    exact: true,
  },
  // Predictions
  {
    path: '/prediction',
    component: () => <Redirect to="/prediction/brain-regions" />,
    exact: true,
  },
  {
    path: '/prediction/brain-regions',
    component: PreBrainRegions,
    exact: true,
  },
  {
    path: '/prediction/layer-anatomy',
    component: PreLayerAnatomy,
    exact: true,
  },
  {
    path: '/prediction/synaptic-pathways',
    component: PreSynapticPathways,
    exact: true,
  },
  {
    path: '/prediction/microcircuits',
    component: PreMicrocircuits,
    exact: true,
  },
];

export default routes;
