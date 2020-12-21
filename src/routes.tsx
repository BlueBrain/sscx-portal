import React, { lazy } from 'react';
import { RouteProps, Redirect } from 'react-router';


const Home = lazy(() => import('./views/Home'));
const Glossary = lazy(() => import('./views/Glossary'));
const About = lazy(() => import('./views/About'));
const Contact = lazy(() => import('./views/Contact'));
// Experimental Data
const ExpLayerAnatomy = lazy(() => import('./views/experimental/LayerAnatomy'));
const ExpNeuronMorpho = lazy(() => import('./views/experimental/NeuronMorphology'));
const ExpNeuronElectro = lazy(() => import('./views/experimental/NeuronElectrophysiology'));
// Reconstruction Data
const RecBrainRegions = lazy(() => import('./views/digitalReconstructions/BrainRegions'));
const ExtBrainRegions = lazy(() => import('./views/reconstructionData/BrainRegions'));
const ExtMicrocircuits = lazy(() => import('./views/reconstructionData/Microcircuit'));
const ExtSynapticPathways = lazy(() => import('./views/reconstructionData/SynapticPathways'));
const ExtNeurons = lazy(() => import('./views/reconstructionData/Neurons'));
// Digital Reconstructions
const RecNeurons = lazy(() => import('./views/digitalReconstructions/Neurons'));
const RecSynapticPathways = lazy(() => import('./views/digitalReconstructions/SynapticPathways'));
const RecMicrocircuit = lazy(() => import('./views/digitalReconstructions/Microcircuit'));
// Validations
const ValBrainRegions = lazy(() => import('./views/validations/BrainRegions'));
const ValNeurons = lazy(() => import('./views/validations/Neurons'));
const ValSynapticPathways = lazy(() => import('./views/validations/SynapticPathways'));
const ValMicrocircuit = lazy(() => import('./views/validations/Microcircuit'));
// Predictions
const PreBrainRegions = lazy(() => import('./views/predictions/BrainRegions'));
const PreNeurons = lazy(() => import('./views/predictions/Neurons'));
const PreSynapticPathways = lazy(() => import('./views/predictions/SynapticPathways'));
const PreMicrocircuit = lazy(() => import('./views/predictions/Microcircuit'));

const Styleguide = lazy(() => import('./views/Styleguide'));
const Download = lazy(() => import('./views/Downloads'));


const routes: RouteProps[] = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/glossary',
    component: Glossary,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/contact-and-submission',
    component: Contact,
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
