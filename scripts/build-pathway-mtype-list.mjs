
import { readdirSync, writeFileSync } from 'fs';


const pathways = readdirSync('./data/Pathways');

const pathwayMtype = {
  pre: {},
  post: {}
};

const pathwayRe = new RegExp('^(L\\d+_.*?)-(L\\d+_.*?)$');
const layerRe = new RegExp('^(L\\d+).*')

pathways.forEach(pathway => {
  const pathwayParsed = pathwayRe.exec(pathway);
  if (!pathwayParsed) {
    console.log(`${pathway} does not look like a pathway directory, skipping`);
    return;
  }

  const preMtype = pathwayParsed[1];
  const postMtype = pathwayParsed[2];

  const preLayer = layerRe.exec(preMtype)[1];
  const postLayer = layerRe.exec(postMtype)[1];

  if (!pathwayMtype.pre[preLayer]) {
    pathwayMtype.pre[preLayer] = [];
  }
  if (!pathwayMtype.pre[preLayer].includes(preMtype)) {
    pathwayMtype.pre[preLayer].push(preMtype);
  }

  if (!pathwayMtype.post[postLayer]) {
    pathwayMtype.post[postLayer] = [];
  }
  if (!pathwayMtype.post[postLayer].includes(postMtype)) {
    pathwayMtype.post[postLayer].push(postMtype);
  }
});

writeFileSync('./data/pathway-mtype.json', JSON.stringify(pathwayMtype));
