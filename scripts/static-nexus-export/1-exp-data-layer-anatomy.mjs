import { writeFileSync, mkdirSync } from 'fs';
import logger from 'node-color-log';

import { nexus, targetBaseDir } from './config.mjs';
import { ensureArray, save } from './utils.mjs';

const layerAnatomyDataQuery = {
  from: 0,
  size: 1000,
  query: {
    bool: {
      filter: [
        {
          bool: {
            should: [
              { term: { '@type': 'LayerThickness' } },
              { term: { '@type': 'NeuronDensity' } },
              { term: { '@type': 'SliceCollection' } },
            ],
          },
        },
      ],
    },
  },
};

const esEndpointUrl = `${nexus.url}/views/${nexus.org}/${nexus.project}/${nexus.defaultESViewId}/_search`;

const layerAnatomyDataRes = await fetch(esEndpointUrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${nexus.accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(layerAnatomyDataQuery),
});

if (!layerAnatomyDataRes.ok || layerAnatomyDataRes.status !== 200) {
  const resBody = await res.text();

  logger.error(`Failed to fetch combined layer anatomy data`);
  logger.error(resBody);
  process.exit(1);
}

const layerAnatomyDataEsRes = await layerAnatomyDataRes.json();
const layerAnatomyData = layerAnatomyDataEsRes.hits.hits.map((hit) => hit._source);

const targetDir = `${targetBaseDir}/views/experimental-data/layer-anatomy`;
mkdirSync(targetDir, { recursive: true });

const layerAnatomyDataPath = `${targetDir}/combined-layer-anatomy-data.json`;
writeFileSync(layerAnatomyDataPath, JSON.stringify(layerAnatomyData));

const sliceCollections = layerAnatomyData.filter((nexusResource) =>
  ensureArray(nexusResource['@type']).some((type) => type === 'SliceCollection')
);

const imageIds = sliceCollections
  .flatMap((collection) => ensureArray(collection.image))
  .map((image) => image['@id']);

logger.info(
  `Found ${sliceCollections.length} slice collections with total of ${imageIds.length} images`
);

imageIds.forEach(async (imageId) => {
  const imgUrl = `${nexus.url}/files/${nexus.org}/${nexus.project}/${encodeURIComponent(imageId)}`;

  await save(imgUrl, `${targetBaseDir}/files`, '*/*');

  logger.success(`Saved ${imageId}`);
});
