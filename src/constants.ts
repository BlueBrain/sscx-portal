
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
  LAYER_ANATOMY: 'L4',
};