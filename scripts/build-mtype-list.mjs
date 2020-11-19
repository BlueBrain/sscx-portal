
import { readdirSync, writeFileSync } from 'fs';


const mtypes = readdirSync('./data/Mtypes');

const layerMtypes = {};

const layerRe = new RegExp('^(L\\d+).*')

mtypes.forEach(mtype => {
  const layerParsed = layerRe.exec(mtype);
  if (!layerParsed) {
    console.log(`${mtype} does not look like a mtype directory, skipping`);
    return;
  }

  const layer = layerParsed[1];

  if (!layerMtypes[layer]) {
    layerMtypes[layer] = [];
  }
  if (!layerMtypes[layer].includes(mtype)) {
    layerMtypes[layer].push(mtype);
  }
});

writeFileSync('./data/layer-mtypes.json', JSON.stringify(layerMtypes));
