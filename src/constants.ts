
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
    LAYER_ANATOMY: 'L4',
    neuronMorphology: {
      LAYER: 'L4',
      M_TYPE: 'L4_TPC',
      INSTANCE: 'C060998B-P4',
    },
    neuronElectrophysiology: {
      ETYPE: 'bAC',
      INSTANCE: 'C170101B-MT-C1',
    },
  },
  digitalReconstruction: {
    microcircuit: {
      LAYER: 'L4',
      BRAIN_REGION: 'S1FL',
    },
    BRAIN_REGIONS: 'S1FL',
    neurons: {
      BRAIN_REGION: 'S1FL',
      LAYER: 'L4',
      ETYPE: 'cADpyr',
      MTYPE: 'L4_TPC',
      MEMODEL: 'L4_TPC_cADpyr_1',
    },
    synapticPathways: {
      REGION: 'S1FL',
      PRELAYER: 'L4',
      POSTLAYER: 'L5',
      PRETYPE: 'L4_TPC',
      POSTTYPE: 'L5_TPC:B',
    },
  },
};
