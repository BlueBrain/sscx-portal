export const listEtypes = () => `
prefix nsg: <https://neuroshapes.org/>

SELECT DISTINCT (?etypeId AS ?id) (?etypeLabel AS ?label)
WHERE {
  ?s rdf:type nsg:Trace ;
     nsg:annotation / nsg:hasBody ?etypeId .
  ?etypeId rdfs:label ?etypeLabel
}
ORDER BY ASC(?etypeLabel)
`;

export const listEtypesExperiments = (etypeId: string) => `
prefix nsg: <https://neuroshapes.org/>
prefix schema: <http://schema.org/>
prefix prov: <http://www.w3.org/ns/prov#>

SELECT DISTINCT (?entity AS ?id) (?entityName AS ?label)
WHERE {
  ?s rdf:type nsg:Trace ;
     nsg:annotation / nsg:hasBody <${etypeId}> ;
     nsg:derivation / prov:entity ?entity .
  ?entity schema:name ?entityName
  }
ORDER BY ASC(?entityName)
`;

export const listLayers = () => `
prefix nsg: <https://neuroshapes.org/>

SELECT DISTINCT ?id ?label
WHERE {
  ?s rdf:type nsg:BrainLocation ;
     nsg:layer ?id .
  ?id rdfs:label ?label
}
ORDER BY ASC(?label)
`;

export const listLayerMtypes = (layerId: string | [string]) => {
  let values: string;
  if (!(typeof layerId === 'string')) {
    values = layerId.reduce((prev, curr) => `${prev} <${curr}>`, '');
  } else {
    values = `<${layerId}>`;
  }

  return `
    prefix nsg: <https://neuroshapes.org/>

    SELECT DISTINCT ?id ?label
    WHERE {
      VALUES ?layerId { ${values} }
      ?s rdf:type nsg:NeuronMorphology ;
         nsg:annotation / nsg:hasBody ?id ;
      nsg:brainLocation / nsg:layer ?layerId  .
      ?id rdfs:label ?label
    }

    ORDER BY ASC(?label)
  `;
};
