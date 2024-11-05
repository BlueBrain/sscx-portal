
import { readFileSync, writeFileSync } from 'fs';
import logger from 'node-color-log';

import { nexus } from './config.mjs'
import { ensureArray, save } from './utils.mjs';

export function fullElectroPhysiologyDataQuery(etype, experiment) {
  if (!etype || !experiment) {
    throw new Error('etype and experiment are required');
  }

  return {
    from: 0,
    size: 10000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [
                { term: { '@type': 'Trace' } },
              ],
            },
          },
          {
            bool: {
              must: {
                term: { 'name.raw': experiment }
              }
            }
          },
          {
            bool: {
              must_not: {
                term: { 'note': 'subset' }
              }
            }
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
};


export function etypeTracesDataQuery(cellNames) {
  if (!cellNames) {
    throw new Error('cellNames is required');
  }

  return {
    from: 0,
    size: 10000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [
                { term: { '@type': 'ExperimentalTrace' } },
              ],
            },
          },
          {
            "bool": {
              "must": [
                { "match": { "note": "All traces" } }
              ]
            }
          },
          {
            bool: {
              must: {
                terms: { 'name.raw': cellNames }
              }
            }
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
          // {
          //   nested: {
          //     path: 'annotation.hasBody',
          //     query: {
          //       bool: {
          //         filter: { term: { 'annotation.hasBody.label.raw': etype } },
          //       },
          //     },
          //   },
          // },
        ],
      },
    },
  };
};

const esEndpointUrl =  `${nexus.url}/views/${nexus.org}/${nexus.project}/${nexus.defaultESViewId}/_search`;

const expEphysData = JSON.parse(readFileSync('../../src/__generated__/experimentalData.json', 'utf-8'));

const ephysTuples = expEphysData.reduce((acc, etypeEntry) => {
  const etype = etypeEntry.label;
  const etypeTuples = etypeEntry.experiments.map(experiment => ([etype, experiment.label]));

  return [...acc, ...etypeTuples];
}, []);

logger.debug(`Found ${ephysTuples.length} ephys`);


logger.debug('Fetching ephys resources')

let ephysToProcess = ephysTuples.length + 1;

for (const tuple of ephysTuples) {
  const [etype, cellName] = tuple;

  ephysToProcess -= 1;
  logger.debug(`Fetching ${etype} ${cellName} (${ephysTuples.length - ephysToProcess + 1} out of ${ephysTuples.length})`);

  const query = fullElectroPhysiologyDataQuery(etype, cellName);

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

    logger.error(`Failed to fetch ${etype} ${cellName}`);
    logger.error(resBody);
    continue;
  }

  const esRes = await res.json();

  if (esRes.hits.total.value === 0) {
    logger.error(`No ${etype} ${cellName} found in Nexus`);
    continue;
  }

  if (esRes.hits.total.value > 1) {
    logger.warning(`Multiple ${cellName} found in Nexus`);
    continue;
  }

  const ephysResource = esRes.hits.hits[0]._source;

  const filePath = `../../public/static-nexus-data/views/experimental-data/neuron-electrophysiology/by-name/${cellName}.json`;

  writeFileSync(filePath, JSON.stringify(ephysResource), { encoding: 'utf-8' });

  logger.success('  + Saved resource');

  const resourceIncomingUrl = `${ephysResource._self}/incoming`;

  const incomingBuffer = await save(resourceIncomingUrl, '../../public/static-nexus-data/incoming', 'application/json');

  logger.success('  + Saved incoming links');

  const incoming = JSON.parse(incomingBuffer.toString('utf-8'));

  const traceWebDataContainerLink = incoming._results
    .find(link => ensureArray(link['@type']).some(type => type.includes('TraceWebDataContainer')));

  if (!traceWebDataContainerLink) {
    logger.error(`  - No TraceWebDataContainer found for ${cellName}`);
  } else {
    const traceWebDataContainerResourceBuffer = await save(traceWebDataContainerLink._self, '../../public/static-nexus-data/resources', 'application/ld+json');
    logger.success('  + Saved TraceWebDataContainer resource');

    const traceWebDataContainerResource = JSON.parse(traceWebDataContainerResourceBuffer.toString('utf-8'));
    const traceWebDataContainerFileUrl = ensureArray(traceWebDataContainerResource.distribution)[0].contentUrl;

    await save(traceWebDataContainerFileUrl, '../../public/static-nexus-data/files', '*/*');
    logger.success('  + Saved TraceWebDataContainer RAB file');
  }

  // downloading the ephys files in nwb format

  const distributions = ensureArray(ephysResource.distribution)
    .filter(d => ['nwb'].includes(d.encodingFormat.toLowerCase().replace('application/', '')));

  for (const distribution of distributions) {
    const fileUrl = distribution.contentUrl;

    await save(fileUrl, '../../public/static-nexus-data/files', '*/*');
  }

  for (const image of ensureArray(ephysResource.image)) {
    const id = image['@id'];

    const fileUrl =  `${nexus.url}/files/${nexus.org}/${nexus.project}/${encodeURIComponent(id)}`;
    await save(fileUrl, '../../public/static-nexus-data/files', '*/*');

    const fileMetaUrl =  `${nexus.url}/files/${nexus.org}/${nexus.project}/${encodeURIComponent(id)}`;
    await save(fileMetaUrl, '../../public/static-nexus-data/file-meta', 'application/ld+json');

    const fileResourceUrl =  `${nexus.url}/resources/${nexus.org}/${nexus.project}/_/${encodeURIComponent(id)}`;
    await save(fileResourceUrl, '../../public/static-nexus-data/resources', 'application/ld+json');

    logger.success(`  + Saved trace image ${id}`);
  }

  logger.success(`Saved metadata, ephys files and trace images for ${etype} ${cellName}`);
};



logger.debug('Fetching ephys resources per etype')

const etypes = Array.from(new Set(ephysTuples.map(([etype]) => etype))).sort();

logger.debug(`Found ${etypes.length} etypes`);

logger.debug(etypes);

for (const etype of etypes) {
  const cellNames = ephysTuples.filter(([tupleEtype]) => tupleEtype === etype).map(([_, cellName]) => cellName);

  const query = etypeTracesDataQuery(cellNames);

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

    logger.error(`Failed to fetch ${etype} ephys`);
    logger.error(resBody);
    continue;
  }

  const esRes = await res.json();

  if (esRes.hits.total.value === 0) {
    logger.error(`No ${etype} ephys found in Nexus`);
    continue;
  }

  const indexFileEphysCount = ephysTuples.filter(([tupleEtype]) => tupleEtype === etype).length;

  if (esRes.hits.total.value !== indexFileEphysCount) {
    logger.warn(`Number of ephys in Nexus does not match number of ephys in index file for ${etype}: ${esRes.hits.total.value} vs ${indexFileEphysCount}`);

    const indexedCellNames = new Set(ephysTuples.filter(([tupleEtype]) => tupleEtype === etype).map(([_, cellName]) => cellName));
    const nexusCellNames = new Set(esRes.hits.hits.map(hit => hit._source.name));

    // missing ephys in nexus
    const missingCellNames = Array.from(indexedCellNames).filter(cellName => !nexusCellNames.has(cellName)).sort();
    logger.error(`Missing ephys in Nexus: ${missingCellNames.join(', ')}`);

    continue;
  }

  const ephys = esRes.hits.hits.map(hit => hit._source);

  const filePath = `../../public/static-nexus-data/views/experimental-data/neuron-electrophysiology/by-etype/${etype}.json`;

  writeFileSync(filePath, JSON.stringify(ephys), { encoding: 'utf-8' });

  logger.success(`Saved ${ephys.length} ephys for ${etype}`);
}
