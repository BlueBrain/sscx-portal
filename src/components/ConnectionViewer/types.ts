
export type NeuriteType = 'soma'
  | 'pre_nb_dend'
  | 'pre_b_axon'
  | 'pre_nb_axon'
  | 'post_b_dend'
  | 'post_nb_dend'
  | 'post_nb_axon';


type MorphSection = number[]; // [sectionType, synPath, X1, Y1, Z1, ..., Xn, Yn, Zn]

type Neuron = {
  etype: string;
  mtype: string;
  layer: string;
  region: string;
  me_combo: string;
  morph_class: 'PYR' | 'INT';
  synapse_class: 'EXC' | 'INH';
  morphology: string;
  morph: MorphSection[];
  orientation: number[][]; // dimensions: <3, 3>
  x: number;
  y: number;
  z: number;
};

type Synapse = number[]; // [X, Y, Z, type, preSectionId, postSectionId, preGid, postGid]

export type ConnectionViewerData = {
  pre: Neuron;
  post: Neuron;
  synapses: Synapse[];
};
