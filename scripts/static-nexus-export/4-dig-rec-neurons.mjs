import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import logger from 'node-color-log';

import { nexus, targetBaseDir } from './config.mjs';
import { ensureArray, save } from './utils.mjs';

const esEndpointUrl = `${nexus.url}/views/${nexus.org}/${nexus.project}/${nexus.defaultESViewId}/_search`;

function modelEphysByNamesDataQuery(names) {
  if (!names) {
    throw new Error('Missing names');
  }

  return {
    from: 0,
    size: 10000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [{ term: { '@type': 'Trace' } }],
            },
          },
          {
            bool: {
              must: {
                terms: { 'name.raw': names },
              },
            },
          },
          {
            bool: {
              must: {
                term: { note: 'subset' },
              },
            },
          },
          {
            nested: {
              path: 'distribution',
              query: {
                bool: {
                  must: {
                    match: { 'distribution.encodingFormat': 'application/nwb' },
                  },
                },
              },
            },
          },
        ],
      },
    },
  };
}

function modelSimTraceByNameDataQuery(modelName) {
  if (!modelName) {
    throw new Error('Missing name');
  }

  return {
    from: 0,
    size: 10000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [{ term: { '@type': 'SingleCellSimulationTrace' } }],
            },
          },
          {
            bool: {
              must: {
                term: { 'name.raw': modelName },
              },
            },
          },
          {
            nested: {
              path: 'distribution',
              query: {
                bool: {
                  must: {
                    match: { 'distribution.encodingFormat': 'application/nwb' },
                  },
                },
              },
            },
          },
        ],
      },
    },
  };
}

const staticDataBaseUrl = 'http://sscx-portal.kcp.bbp.epfl.ch/sscx-portal/data/';

const memodelIndexPath = `${staticDataBaseUrl}/memodel-index.json`;
const memodelNumberExceptionsPath = `${staticDataBaseUrl}/memodel-number-exceptions.json`;

const memodelIndexPathRes = await fetch(memodelIndexPath);
const memodelIndex = await memodelIndexPathRes.json(); // Structure: <region> -> <mtype> -> <etype>

const memodelNumberExceptionsPathRes = await fetch(memodelNumberExceptionsPath);
const memodelNumberExceptions = await memodelNumberExceptionsPathRes.json(); // Structure: <mtype> -> <etype> -> <region> -> <n>

const modelTriples = Object.entries(memodelIndex).reduce((acc, [region, mtypeObj]) => {
  const mtypeEntries = Object.entries(mtypeObj).flatMap(([mtype, etypes]) => {
    return etypes.map((etype) => [region, mtype, etype]);
  });

  return [...acc, ...mtypeEntries];
}, []);

async function saveTraceData(modelName, traceResource, targetDir) {
  const filePath = `${targetDir}/${modelName}.json`;

  writeFileSync(filePath, JSON.stringify(traceResource), { encoding: 'utf-8' });

  logger.success('  + Saved resource');

  const resourceIncomingUrl = `${traceResource._self}/incoming`;

  const incomingBuffer = await save(
    resourceIncomingUrl,
    `${targetBaseDir}/incoming`,
    'application/json'
  );

  logger.success('  + Saved incoming links');

  const incoming = JSON.parse(incomingBuffer.toString('utf-8'));

  const traceWebDataContainerLink = incoming._results.find((link) =>
    ensureArray(link['@type']).some((type) => type.includes('TraceWebDataContainer'))
  );

  if (!traceWebDataContainerLink) {
    logger.error(`  - No TraceWebDataContainer found for ${modelName}`);
  } else {
    const traceWebDataContainerResourceBuffer = await save(
      traceWebDataContainerLink._self,
      `${targetBaseDir}/resources`,
      'application/ld+json'
    );
    logger.success('  + Saved TraceWebDataContainer resource');

    const traceWebDataContainerResource = JSON.parse(
      traceWebDataContainerResourceBuffer.toString('utf-8')
    );
    const traceWebDataContainerFileUrl = ensureArray(traceWebDataContainerResource.distribution)[0]
      .contentUrl;

    await save(traceWebDataContainerFileUrl, `${targetBaseDir}/files`, '*/*');
    logger.success('  + Saved TraceWebDataContainer RAB file');
  }

  // downloading the ephys files in nwb format

  const distributions = ensureArray(traceResource.distribution).filter((d) =>
    ['nwb'].includes(d.encodingFormat.toLowerCase().replace('application/', ''))
  );

  for (const distribution of distributions) {
    const fileUrl = distribution.contentUrl;

    await save(fileUrl, `${targetBaseDir}/files`, '*/*');
    logger.success(`  + Saved NWB file`);
  }

  for (const image of ensureArray(traceResource.image)) {
    const id = image['@id'];

    const fileUrl = `${nexus.url}/files/${nexus.org}/${nexus.project}/${encodeURIComponent(id)}`;
    await save(fileUrl, `${targetBaseDir}/files`, '*/*');

    const fileMetaUrl = `${nexus.url}/files/${nexus.org}/${nexus.project}/${encodeURIComponent(id)}`;
    await save(fileMetaUrl, `${targetBaseDir}/file-meta`, 'application/ld+json');

    const fileResourceUrl = `${nexus.url}/resources/${nexus.org}/${nexus.project}/_/${encodeURIComponent(id)}`;
    await save(fileResourceUrl, `${targetBaseDir}/resources`, 'application/ld+json');

    logger.success(`  + Saved trace image ${id}`);
  }

  logger.success(`  + Saved metadata, ephys files and trace images for ${modelName}`);
}

let modelSetsToProcess = modelTriples.length + 1;

for (const modelTriple of modelTriples) {
  const [region, mtype, etype] = modelTriple;

  modelSetsToProcess -= 1;

  // if ((modelTriples.length - modelSetsToProcess + 1) < 1206) {
  //   continue
  // }

  logger.debug(
    `Fetching ${region} ${mtype} ${etype} (${modelTriples.length - modelSetsToProcess + 1} out of ${modelTriples.length})`
  );

  const nInstancess = memodelNumberExceptions[mtype]?.[etype]?.[region] || 5;

  const instanceIdxs = Array.from({ length: nInstancess }, (_, i) => i + 1);

  for (const instanceIdx of instanceIdxs) {
    const modelName = `${region}_${mtype}_${etype}_${instanceIdx}`;

    const query = modelSimTraceByNameDataQuery(modelName);

    const res = await fetch(esEndpointUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${nexus.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!res.ok || res.status !== 200) {
      const resBody = await res.text();

      logger.error(`Failed to fetch ${etype} ${modelName}`);
      logger.error(resBody);
      continue;
    }

    const esRes = await res.json();

    if (esRes.hits.total.value === 0) {
      logger.error(`No ${etype} ${modelName} found in Nexus`);
      continue;
    }

    if (esRes.hits.total.value > 1) {
      logger.warning(`Multiple ${modelName} found in Nexus`);
      continue;
    }

    const traceResource = esRes.hits.hits[0]._source;

    // if (existsSync(`${targetBaseDir}/views/digital-reconstructions/neurons/by-name/${modelName}.json`)) {
    //   logger.debug(`    + sim trace ${modelName} already exists`);
    //   continue;
    // }

    const neuronByNameTargetDir = `${targetBaseDir}/views/digital-reconstructions/neurons/by-name`;
    mkdirSync(neuronByNameTargetDir, { recursive: true });

    await saveTraceData(
      modelName,
      traceResource,
      neuronByNameTargetDir
    );

    const etypeFactsheetPath = `${staticDataBaseUrl}/memodel-factsheets/${mtype}/${etype}/${region}/${mtype}_${etype}_${instanceIdx}/e_type_factsheet.json`;
    const etypeFactsheetRes = await fetch(etypeFactsheetPath);
    const etypeFactsheet = await etypeFactsheetRes.json();

    const modelFittingExpTraceNames = etypeFactsheet[4].value;

    if (modelFittingExpTraceNames.length === 0) {
      logger.error(`No model fitting traces found for ${modelName}`);
      continue;
    }

    const modelFittingExpTracesRes = await fetch(esEndpointUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${nexus.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modelEphysByNamesDataQuery(modelFittingExpTraceNames)),
    });

    if (!modelFittingExpTracesRes.ok || modelFittingExpTracesRes.status !== 200) {
      const resBody = await modelFittingExpTracesRes.text();

      logger.error(`Failed to fetch model fitting traces for ${modelName}`);
      logger.error(resBody);
      continue;
    }

    const modelFittingEsRes = await modelFittingExpTracesRes.json();

    const modelFittingTraceResources = modelFittingEsRes.hits.hits.map((hit) => hit._source);

    const digest = await crypto.subtle.digest(
      'SHA-256',
      Buffer.from(modelFittingExpTraceNames.join(''))
    );

    const nameListHexHash = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    logger.debug(`    + Model fitting traces hash: ${nameListHexHash}`);

    const modelFittingTracesTargetDir = `${targetBaseDir}/views/digital-reconstructions/neurons/model-fitting-exp-traces`;
    mkdirSync(modelFittingTracesTargetDir, { recursive: true });

    const modelFittingTracesPath = `${modelFittingTracesTargetDir}/${nameListHexHash}.json`;
    if (existsSync(modelFittingTracesPath)) {
      logger.debug(`    + Model fitting traces already saved`);
      continue;
    }

    writeFileSync(modelFittingTracesPath, JSON.stringify(modelFittingTraceResources), {
      encoding: 'utf-8',
    });
    logger.success(`  + Saved a list of exp traces used for model fitting`);

    for (const modelFittingTraceResource of modelFittingTraceResources) {
      if (existsSync(`${targetBaseDir}/views/digital-reconstructions/neurons/by-name/${modelFittingTraceResource.name}`)) {
        logger.debug(`    + Model fitting trace ${modelFittingTraceResource.name} already exists`);
        continue;
      }

      logger.debug(
        `    + Saving experimental trace used for model fitting: ${modelFittingTraceResource.name}`
      );
      await saveTraceData(
        modelFittingTraceResource.name,
        modelFittingTraceResource,
        `${targetBaseDir}/views/digital-reconstructions/neurons/by-name`
      );
      logger.success(
        `  + Saved ${modelFittingTraceResource.name} - exp trace used for model fitting`
      );
    }
  }
}
