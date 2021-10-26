
import { Layer, Subregion } from './types';


export const layers: Layer[] = [
  'L1',
  'L23',
  'L4',
  'L5',
  'L6',
];

export const subregions: Subregion[] = [
  'S1DZ',
  'S1DZO',
  'S1FL',
  'S1HL',
  'S1J',
  'S1Sh',
  'S1Tr',
  'S1ULp',
];

export const subregionTitle: Record<Subregion, string> = {
  S1DZ: 'Disgranular zone',
  S1DZO: 'Oral disgranular zone',
  S1FL: 'Fore Limb',
  S1HL: 'Hind limb',
  S1J: 'Jaw',
  S1Sh: 'Shoulder',
  S1Tr: 'Trunk',
  S1ULp: 'Upper lip',
};

export const defaultSelection = {
  experimentalData: {
    layerAnatomy: {
      layer: 'L4',
    },
    neuronMorphology: {
      layer: 'L4',
      mtype: 'L4_TPC',
      instance: 'C060998B-P4',
    },
    neuronElectrophysiology: {
      etype: 'bAC',
      etype_instance: 'C170101B-MT-C1',
    },
  },
  digitalReconstruction: {
    microcircuit: {
      layer: 'L4',
      brain_region: 'S1FL',
    },
    brainRegions: {
      brain_region: 'S1FL',
    },
    neurons: {
      brain_region: 'S1FL',
      layer: 'L4',
      etype: 'cADpyr',
      mtype: 'L4_TPC',
      memodel: 'L4_TPC_cADpyr_1',
    },
    synapticPathways: {
      brain_region: 'S1FL',
      prelayer: 'L4',
      postlayer: 'L5',
      pretype: 'L4_TPC',
      posttype: 'L5_TPC:B',
    },
  },
};
