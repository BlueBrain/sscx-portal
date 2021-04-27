
import { basePath } from '../../config';


export const subregionCircuitFactsheetPath = (subregion: string): string => {
  return `${basePath}/data/model-data/factsheets/REGION/${subregion}/Circuit/factsheet.json`;
};

export const regionCircuitFactsheetPath = (): string => {
  return `${basePath}/data/model-data/factsheets/Circuit/factsheet.json`;
}

export const subregionMicrocircuitFactsheetPath = (subregion: string): string => {
  return `${basePath}/data/model-data/factsheets/REGION/${subregion}/Central/Circuit/factsheet.json`;
}

export const etypeFactsheetPath = (
  region: string,
  mtype: string,
  etype: string,
  instance: string
): string => {
  return `${basePath}/data/memodel-factsheets/${mtype}/${etype}/${region}/${instance}/e_type_factsheet.json`;
}

export const mtypeFactsheetPath = (region: string, mtype: string) => {
  return `${basePath}/data/model-data/REGION/${region}/Central/MTypes/${mtype}/factsheet.json`;
};

export const metypeFactsheetPath = (
  region: string,
  mtype: string,
  etype: string,
  instance: string,
) => {
  return `${basePath}/data/memodel-factsheets/${mtype}/${etype}/${region}/${instance}/me_type_factsheet.json`;
}

export const layerFactsheetPath = (subregion: string, layerNum: number): string => {
  return `${basePath}/data/model-data/factsheets/REGION/${subregion}/Central/CircuitLayers/${layerNum}/factsheet.json`;
};

export const pathwayFactsheetPath = (subregion: string, pathway: string): string => {
  return `${basePath}/data/model-data/factsheets/REGION/${subregion}/Central/Pathways/${pathway}/factsheet.json`;
};

export const expMorphologyFactsheetPath = (morphologyName: string): string => {
  return `${basePath}/data/exp-morphologies/factsheets/${morphologyName}/morphology_factsheeet.json`;
};

export const morphHistogramIndexPath = (region: string, mtype: string) => {
  return `${basePath}/data/morph-histogram/${region}_Column/${mtype}/histogram-index.json`;
};

export const bapMoviePath = (region: string, mtype: string, etype: string, morphology: string) => {
  return `${basePath}/data/epsp-bap/${region}/${mtype}_${etype}/${morphology}/bap.mp4`;
};

export const epspMoviePath = (region: string, mtype: string, etype: string, morphology: string) => {
  return `${basePath}/data/epsp-bap/${region}/${mtype}_${etype}/${morphology}/epsp.mp4`;
};
