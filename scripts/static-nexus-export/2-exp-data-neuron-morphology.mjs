import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import logger from 'node-color-log';

import { nexus, targetBaseDir } from './config.mjs';
import { ensureArray, save } from './utils.mjs';

function agentsDataQuery() {
  return {
    from: 0,
    size: 100,
    query: {
      term: {
        '@type': 'Agent',
      },
    },
  };
}

function mtypeMorphologyListDataQuery(mtype) {
  if (!mtype) {
    throw new Error('mtype is required');
  }

  return {
    from: 0,
    size: 200,
    query: {
      bool: {
        filter: [
          {
            bool: {
              should: [
                {
                  term: {
                    _deprecated: false,
                  },
                },
              ],
            },
          },
          {
            bool: {
              should: [
                {
                  term: {
                    '@type': 'NeuronMorphology',
                  },
                },
              ],
            },
          },
          {
            nested: {
              path: 'annotation.hasBody',
              query: {
                bool: {
                  filter: [
                    {
                      term: {
                        'annotation.hasBody.label.raw': mtype.replace('CHC', 'ChC'),
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };
}

function morphologyDataQuery(mtype, instance) {
  if (!mtype || !instance) {
    throw new Error('mtype and instance are required');
  }

  return {
    from: 0,
    size: 100,
    query: {
      bool: {
        filter: [
          {
            bool: {
              should: [
                {
                  term: {
                    _deprecated: false,
                  },
                },
              ],
            },
          },
          {
            bool: {
              should: [
                {
                  term: {
                    '@type': 'NeuronMorphology',
                  },
                },
              ],
            },
          },
          {
            bool: {
              should: [
                {
                  term: {
                    'name.raw': instance,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };
}

const esEndpointUrl = `${nexus.url}/views/${nexus.org}/${nexus.project}/${nexus.defaultESViewId}/_search`;

const expMorphologyData = JSON.parse(
  readFileSync('../../src/__generated__/exp-morphology-data.json', 'utf-8')
);

const morphologyTriples = Object.entries(expMorphologyData).reduce((layerAcc, layerEntry) => {
  const [layer, layerObj] = layerEntry;

  const layerTriples = Object.entries(layerObj).reduce((layerAcc, mtypeEntry) => {
    const [mtype, morphNames] = mtypeEntry;

    return [...layerAcc, ...morphNames.map((morphName) => [layer, mtype, morphName])];
  }, []);

  return [...layerAcc, ...layerTriples];
}, []);

logger.debug(`Found ${morphologyTriples.length} morphologies`);

logger.debug('Fetching agent resources');

const agentsQuery = agentsDataQuery();
const agentsRes = await fetch(esEndpointUrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${nexus.accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(agentsQuery),
});

if (!agentsRes.ok || agentsRes.status !== 200) {
  const resBody = await res.text();

  logger.error(`Failed to fetch agents`);
  logger.error(resBody);
  process.exit(1);
}

const agentsEsRes = await agentsRes.json();
const agents = agentsEsRes.hits.hits.map((hit) => hit._source);

const agentsTargetDir = `${targetBaseDir}/views/experimental-data/common`;
mkdirSync(agentsTargetDir, { recursive: true });

const agentsFilePath = `${agentsTargetDir}/agents.json`;
writeFileSync(agentsFilePath, JSON.stringify(agents));
logger.success(`Saved agents.json with ${agents.length} entries`);

logger.debug('Fetching morphology resources');

for (const triple of morphologyTriples) {
  const [layer, mtype, morphologyName] = triple;

  const query = morphologyDataQuery(mtype, morphologyName);

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

    logger.error(`Failed to fetch ${mtype} ${morphologyName}`);
    logger.error(resBody);
    continue;
  }

  const esRes = await res.json();

  if (esRes.hits.total.value === 0) {
    logger.error(`No ${mtype} ${morphologyName} found in Nexus`);
    continue;
  }

  if (esRes.hits.total.value > 1) {
    logger.warning(`Multiple ${morphologyName} found in Nexus`);
    continue;
  }

  const morphologyResource = esRes.hits.hits[0]._source;

  const morphByNameTargetDir = `${targetBaseDir}/views/experimental-data/neuron-morphology/by-name`;
  mkdirSync(morphByNameTargetDir, { recursive: true });

  const filePath = `${morphByNameTargetDir}/${morphologyName}.json`;

  writeFileSync(filePath, JSON.stringify(morphologyResource), { encoding: 'utf-8' });

  // downloading the morphology files in SWC and ASC formats

  const distributions = ensureArray(morphologyResource.distribution).filter((d) =>
    ['asc', 'swc'].includes(d.encodingFormat.toLowerCase().replace('application/', ''))
  );

  for (const distribution of distributions) {
    const fileUrl = distribution.contentUrl;

    await save(fileUrl, `${targetBaseDir}/files`, '*/*');
  }

  logger.success(`Saved metadata and morphology files for ${mtype} ${morphologyName}`);
}

logger.debug('Fetching morphology resources per mtype');

const mtypes = Array.from(new Set(morphologyTriples.map(([layer, mtype]) => mtype))).sort();

logger.debug(`Found ${mtypes.length} mtypes`);

for (const mtype of mtypes) {
  const query = mtypeMorphologyListDataQuery(mtype);

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

    logger.error(`Failed to fetch ${mtype} morphologies`);
    logger.error(resBody);
    continue;
  }

  const esRes = await res.json();

  if (esRes.hits.total.value === 0) {
    logger.error(`No ${mtype} morphologies found in Nexus`);
    continue;
  }

  const indexFileMorphCount = morphologyTriples.filter(
    ([layer, tripleMtype]) => tripleMtype === mtype
  ).length;

  if (esRes.hits.total.value !== indexFileMorphCount) {
    logger.warn(
      `Number of morphologies in Nexus does not match number of morphologies in index file: ${esRes.hits.total.value} vs ${indexFileMorphCount}`
    );
    continue;
  }

  const morphologies = esRes.hits.hits.map((hit) => hit._source);

  const morphsByMtypeTargetDir = `${targetBaseDir}/views/experimental-data/neuron-morphology/by-mtype`;
  mkdirSync(morphsByMtypeTargetDir, { recursive: true });

  const filePath = `${morphsByMtypeTargetDir}/${mtype}.json`;

  writeFileSync(filePath, JSON.stringify(morphologies), { encoding: 'utf-8' });

  logger.success(`Saved ${morphologies.length} morphologies for ${mtype}`);
}
