import { writeFileSync } from 'fs';
import * as path from 'path';
import { createNexusClient } from '@bbp/nexus-sdk';
import fetch from 'node-fetch';
import 'abort-controller/polyfill';
import buildExperimentalData from './getExperimentalData';

const nexus = createNexusClient({
  uri: 'https://bbp.epfl.ch/nexus/v1',
  token: process.env.NEXUS_TOKEN || undefined,
  fetch,
});

async function main() {
  const expData = await buildExperimentalData(nexus);
  writeFileSync(
    './src/__generated__/experimentalData.json',
    JSON.stringify(expData, null, 2),
  );
}

main();
