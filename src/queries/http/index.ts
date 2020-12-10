
export const subregionCircuitFactsheetPath = (subregion: string): string => {
  // FIXME: change to full circuit once Vishal finishes it
  return `/data/model-data/factsheets/REGION/${subregion}/Central/Circuit/factsheet.json`;
};

export const regionCircuitFactsheetPath = (): string => {
  return '/data/model-data/factsheets/Circuit/factsheet.json';
}

export const subregionMicrocircuitFactsheetPath = (subregion: string): string => {
  return `/data/model-data/factsheets/REGION/${subregion}/Central/Circuit/factsheet.json`;
}

export const layerFactsheetPath = (subregion: string, layerNum: number): string => {
  return `/data/model-data/factsheets/REGION/${subregion}/Central/CircuitLayers/${layerNum}/factsheet.json`;
};

export const pathwayFactsheetPath = (pathway: string): string => {
  return `/data/Pathways/${pathway}/factsheet.json`;
};

export const expMorphologyFactsheetPath = (morphologyName: string): string => {
  return `/data/exp-morphologies/factsheets/${morphologyName}/morphology_factsheeet.json`;
};
