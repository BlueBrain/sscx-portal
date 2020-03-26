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
// Validations
import ValBrainRegions from './views/validations/BrainRegions';
import ValLayerAnatomy from './views/validations/LayerAnatomy';
import ValSynapticPathways from './views/validations/SynapticPathways';
import ValMicrocircuits from './views/validations/Microcircuits';
// Predictions
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
    path: '/validations/layer-anatomy',
    component: ValLayerAnatomy,
    exact: true,
  },
  {
    path: '/validations/synaptic-pathways',
    component: ValSynapticPathways,
    exact: true,
  },
  {
    path: '/validations/microcircuits',
    component: ValMicrocircuits,
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
    path: '/predictions/layer-anatomy',
    component: PreLayerAnatomy,
    exact: true,
  },
  {
    path: '/predictions/synaptic-pathways',
    component: PreSynapticPathways,
    exact: true,
  },
  {
    path: '/predictions/microcircuits',
    component: PreMicrocircuits,
    exact: true,
  },
];

export default routes;
