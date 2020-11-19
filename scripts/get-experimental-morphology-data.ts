import { NexusClient } from '@bbp/nexus-sdk';
import { sscx } from '../src/config';
import { get, set }  from 'lodash';


const query = {
  from: 0,
  size: 10000,
  query: {
    bool: {
      must: [{
        term: {
          _deprecated: false,
        },
      }, {
        term: {
          '@type': 'https://neuroshapes.org/ReconstructedCell',
        }
      }]
    },
  },
};

// build a list of e-types and their experiments
export default async (nexus: NexusClient) => {
  const data = await nexus.View.elasticSearchQuery(
    sscx.org,
    sscx.project,
    sscx.expNeuronElectroViewId,
    query,
  ).catch(console.error);

  const morphologies = data.hits.hits.map(hit => hit._source);

  const mapData  = {};

  morphologies.forEach(morphology => {
    const layersRaw = Array.isArray(morphology.brainLocation.layer)
      ? morphology.brainLocation.layer.map(l => `L${l.label.match(/\d/)[0]}`)
      : [`L${morphology.brainLocation.layer.label.match(/\d/)[0]}`]

    const layers = Array.from(new Set(layersRaw.map(layer => layer.match(/2|3/) ? 'L23' : layer)));

    console.log(`Raw: ${layersRaw}, layers: ${layers}`);

    const mtype = morphology.annotation.hasBody.label;
    const instance = morphology.name;

    layers.forEach(layer => {
      const path = `${layer}.${mtype}`;
      const mapDataPath = get(mapData, path);
      if (!mapDataPath) {
        set(mapData, path, [instance]);
      } else {
        mapDataPath.push(instance);
      }
    });
  });

  return mapData;
};
