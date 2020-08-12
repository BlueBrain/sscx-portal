export const subregionFactsheetPath = (subregion: string) => {
  return `/data/Circuit/Central/factsheet.json`;
};

export const layerFactsheetPath = (subregion: string, layerNum: number) => {
  return `/data/CircuitLayers/${layerNum}/factsheet.json`;
};
