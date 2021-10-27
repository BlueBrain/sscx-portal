const fs = require('fs');

const morphologies = Object.values(JSON.parse(fs.readFileSync('exp-morphology-data.json'))).flatMap(mtypeObj => Object.values(mtypeObj)).flat().sort();

morphologies.forEach(morphology => {
  if(!fs.existsSync(`exp-morph-models/${morphology}.json`)) {
    console.log(`Creating empty file for ${morphology}`);
    fs.writeFileSync(`exp-morph-models/${morphology}.json`, JSON.stringify([]), 'utf8');
  }
});

