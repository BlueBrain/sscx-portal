
import { readFileSync, writeFileSync } from 'fs';
import logger from 'node-color-log';

import { nexus } from './config.mjs'
import { ensureArray } from './utils.mjs';

const layerAnatomyData = JSON.parse(readFileSync('../../public/static-nexus-data/views/experimental-data/layer-anatomy/combined-layer-anatomy-data.json', 'utf-8'));

const sliceCollections = layerAnatomyData
  .map(esHit => esHit._source)
  .filter(nexusResource => ensureArray(nexusResource['@type']).some(type => type === 'SliceCollection'));

const imageIds = sliceCollections
  .flatMap(collection => ensureArray(collection.image)).map(image => image['@id']);

logger.info(`Found ${sliceCollections.length} slice collections with total of ${imageIds.length} images`);

imageIds.forEach(async (imageId) => {
  const imgUrl = `${nexus.url}/files/${nexus.org}/${nexus.project}/${encodeURIComponent(imageId)}`;
  const res = await fetch(imgUrl, {
    headers: {
      Authorization: `Bearer ${nexus.accessToken}`,
    },
  });
  if (!res.ok) {
    const resBody = await res.text();

    logger.error(`Failed to fetch ${imageId}`);
    logger.error(resBody);
    return;
  }
  const imageBuf = await res.arrayBuffer();
  const fileName = imageId.split('/').at(-1);

  writeFileSync(`../../public/static-nexus-data/files/${fileName}`, Buffer.from(imageBuf));

  logger.success(`Saved ${imageId}`);
});

