
export const subregionFactsheetPath = (subregion: string): string => {
  return `/data/Circuit/Central/factsheet.json`;
};

export const regionFactsheetPath = (subregion: string): string => {
  return `/data/Circuit/Central/factsheet.json`;
}

export const layerFactsheetPath = (subregion: string, layerNum: number): string => {
  return `/data/CircuitLayers/${layerNum}/factsheet.json`;
};

export const pathwayFactsheetPath = (pathway: string): string => {
  return `/data/Pathways/${pathway}/factsheet.json`;
};

export const expMorphologyFactsheetPath = (morphologyName: string): string => {
  return `/data/exp-morphologies/factsheets/${morphologyName}/morphology_factsheeet.json`;
};
