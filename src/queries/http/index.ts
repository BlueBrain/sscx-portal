
import { basePath, staticDataBaseUrl } from '../../config';

export const expDataLayerAnatomyDataPath = () => {
  return `${staticDataBaseUrl}/nexus/views/experimental-data/layer-anatomy/combined-layer-anatomy-data.json`;
};

export const expDataNeuronMorphologyDataPath = (morphologyName) => {
  return `${staticDataBaseUrl}/nexus/views/experimental-data/neuron-morphology/by-name/${morphologyName}.json`;
};

export const expDataNeuronMorphologyListDataPath = (mtype) => {
  return `${staticDataBaseUrl}/nexus/views/experimental-data/neuron-morphology/by-mtype/${mtype}.json`;
};

export const expDataAgentsPath = () => {
  return `${staticDataBaseUrl}/nexus/views/experimental-data/common/agents.json`;
}

export const fullElectroPhysiologyDataPath = (instance: string) => {
  return `${staticDataBaseUrl}/nexus/views/experimental-data/neuron-electrophysiology/by-name/${instance}.json`;
}

export const etypeTracesDataQuery = (etype: string) => {
  return `${staticDataBaseUrl}/nexus/views/experimental-data/neuron-electrophysiology/by-etype/${etype}.json`;
}

export const subregionCircuitFactsheetPath = (subregion: string): string => {
  return `${staticDataBaseUrl}/model-data/REGION/${subregion}/Circuit/factsheet.json`;
};

export const regionCircuitFactsheetPath = (): string => {
  return `${staticDataBaseUrl}/model-data/Circuit/factsheet.json`;
}

export const subregionMicrocircuitFactsheetPath = (subregion: string): string => {
  return `${staticDataBaseUrl}/model-data/REGION/${subregion}/Central/Circuit/factsheet.json`;
}

export const etypeFactsheetPath = (
  region: string,
  mtype: string,
  etype: string,
  instance: string
): string => {
  return `${staticDataBaseUrl}/memodel-factsheets/${mtype}/${etype}/${region}/${instance}/e_type_factsheet.json`;
}

export const mtypeFactsheetPath = (region: string, mtype: string) => {
  return `${staticDataBaseUrl}/model-data/REGION/${region}/Central/MTypes/${mtype}/factsheet.json`;
};

export const metypeFactsheetPath = (
  region: string,
  mtype: string,
  etype: string,
  instance: string,
) => {
  return `${staticDataBaseUrl}/memodel-factsheets/${mtype}/${etype}/${region}/${instance}/me_type_factsheet.json`;
}

export const layerFactsheetPath = (subregion: string, layerNum: number): string => {
  return `${staticDataBaseUrl}/model-data/REGION/${subregion}/Central/CircuitLayers/${layerNum}/factsheet.json`;
};

export const pathwayIndexPath = `${staticDataBaseUrl}/pathway-index.json`;

export const connectionViewerDataPath = (region: string, pathway: string) => {
  return `${staticDataBaseUrl}/dig-rec/pathways/connection-viewer/${region}/${region}-${pathway}.msgpack`;
};

export const pathwayFactsheetPath = (subregion: string, pathway: string): string => {
  return `${staticDataBaseUrl}/model-data/REGION/${subregion}/Central/Pathways/${pathway}/factsheet.json`;
};

export const synapticPhysiologyPlotPath = (subregion: string, pathway: string, plotName: string): string => {
  return `${staticDataBaseUrl}/model-data/REGION/${subregion}/Central/Pathways/${pathway}/SynapticPhysiology/${plotName}.png`;
};

export const synapticAnatomyPlotPath = (subregion: string, pathway: string, plotName: string): string => {
  return `${staticDataBaseUrl}/model-data/REGION/${subregion}/Central/Pathways/${pathway}/SynapticAnatomy/${plotName}.png`;
};

export const expMorphologyFactsheetPath = (morphologyName: string): string => {
  return `${staticDataBaseUrl}/exp-morphologies/factsheets/${morphologyName}/morphology_factsheeet.json`;
};

export const expMorphologyImgPath = (morphology: string) => {
  return `${staticDataBaseUrl}/exp-morph-images/${morphology}.png`;
};

export const expMorphologyImgThumbnailPath = (morphology: string) => {
  return `${staticDataBaseUrl}/exp-morph-images/${morphology}__w640.png`;
};

export const morphHistogramIndexPath = (region: string, mtype: string) => {
  return `${staticDataBaseUrl}/morph-histogram/${region}_Column/${mtype}/histogram-index.json`;
};

export const morphHistogramImgPath = (region: string, mtype: string, histogramType: string, axonType: string) => {
  return `${staticDataBaseUrl}/morph-histogram/${region}_Column/${mtype}/${histogramType}-${axonType}.png`
};

export const bapMoviePath = (region: string, mtype: string, etype: string, morphology: string) => {
  return `${staticDataBaseUrl}/epsp-bap/${region}/${mtype}_${etype}/${morphology}/bap.mp4`;
};

export const epspMoviePath = (region: string, mtype: string, etype: string, morphology: string) => {
  return `${staticDataBaseUrl}/epsp-bap/${region}/${mtype}_${etype}/${morphology}/epsp.mp4`;
};

export const modelExpMorphologiesPath = (
  region: string,
  mtype: string,
  etype: string,
  instance: string,
) => {
  return `${staticDataBaseUrl}/memodel-factsheets/${mtype}/${etype}/${region}/${instance}/exp-morphologies.json`;
};

export const expMorphMemodelsPath = (morphologyName: string) => {
  return `${staticDataBaseUrl}/exp-morph-models/${morphologyName}.json`;
};

export const expMorphPopulationFactesheetPath = (mtype: string) => {
  return `${staticDataBaseUrl}/exp-morph-populations/${mtype}/factsheet.json`;
};

export const expMorphPopulationPlotIndexPath = (mtype: string) => {
  return `${staticDataBaseUrl}/exp-morph-populations/${mtype}/plots.json`;
};

export const expMorphPopulationPlotPath = (mtype, plotName: string) => {
  return `${staticDataBaseUrl}/exp-morph-populations/${mtype}/${plotName}`;
};

export const expEphysPopulationPlotIndexPath = (mtype: string) => {
  return `${staticDataBaseUrl}/exp-trace-populations/${mtype}/plots.json`;
};

export const expEphysPopulationPlotPath = (etype: string, protocol: string, plotName: string) => {
  return `${staticDataBaseUrl}/exp-trace-populations/${etype}/${protocol}/${plotName}`;
};

export const expTracePopulationFactsheetPath = (etype: string) => {
  return `${staticDataBaseUrl}/exp-trace-populations/${etype}/factsheet.json`;
};

export const expTraceFactsheetPath = (instance: string) => {
  return `${staticDataBaseUrl}/exp-trace-factsheets/${instance}/factsheet.json`;
};

export const memodelNumberExceptionsPath = `${staticDataBaseUrl}/memodel-number-exceptions.json`;

export const memodelIndexPath = `${staticDataBaseUrl}/memodel-index.json`;

export const modelSimTraceByNameDataQuery = (region, memodel) => {
  return `${staticDataBaseUrl}/nexus/views/digital-reconstructions/neurons/by-name/${region}_${memodel}.json`;
};

export const modelEphysByNamesDataQuery = async (expTraceNames: string[]) => {
  const digest = await crypto.subtle.digest('SHA-256', Buffer.from(expTraceNames.join('')));
  const hexHash = Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return `${staticDataBaseUrl}/nexus/views/digital-reconstructions/neurons/model-fitting-exp-traces/${hexHash}.json`;
};

export const memodelMorphologyPath = (morphology: string) => {
  return `${staticDataBaseUrl}/memodel-morphologies-swc/${morphology}.swc`;
};

export const memodelArchivePath = (
  region: string,
  mtype: string,
  etype: string,
  memodel: string,
) => {
  return [
    staticDataBaseUrl,
    'memodel-archives',
    encodeURIComponent(mtype),
    encodeURIComponent(etype),
    encodeURIComponent(region),
    `${memodel}.tar.xz`
  ].join('/');
};
